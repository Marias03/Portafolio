import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// El mismo embeber de la ingesta — pregunta y chunks DEBEN usar el mismo modelo
async function embeber(texto: string): Promise<number[]> {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/baai/bge-m3`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: [texto] }),
    },
  );
  const data = await res.json();
  return data.result.data[0];
}

export async function POST(request: Request) {
  const { pregunta, locale } = await request.json();

  // 1. RETRIEVAL — la pregunta se vuelve vector...
  const vectorPregunta = await embeber(pregunta);

  // ...y buscamos sus 5 vecinos más cercanos (¡el k-NN de la teoría!):
  const chunks = await prisma.$queryRaw<
    { contenido: string; fuente: string }[]
  >`
    SELECT contenido, fuente
    FROM "Chunk"
    ORDER BY embedding <=> ${`[${vectorPregunta.join(",")}]`}::vector
    LIMIT 8
  `;

  // 2. AUGMENTED — los vecinos se inyectan al prompt:
  const contexto = chunks
    .map((c) => `[source: ${c.fuente}]\n${c.contenido}`)
    .join("\n\n---\n\n");

  const systemPrompt = `You are AskMaria, an assistant on Maria Juliana Arias's portfolio.
You answer questions from recruiters and visitors about Maria's experience, projects and skills.
- Never state dates, durations or numbers that are not explicitly in the context.
- If the question is broad (e.g. "tell me about her experience"), summarize ALL relevant items found in the context, not just one.
- When relevant, mention the source naturally (e.g. "according to her work experience" or "among her projects") — never mention file names like "experience.md".
 Do not mention sources or file names in your answers.

Answer ONLY based on the following context extracted from Maria's documents.
If the answer is not in the context, say you don't have that information and suggest contacting Maria directly.

CONTEXT:
${contexto}

Rules:
- Answer in ${locale === "es" ? "Spanish" : locale === "ru" ? "Russian" : "English"}.
- Be concise, warm and professional.
- Mention which document the information comes from when relevant.
- Never invent facts that are not in the context.`;

  // 3. GENERATION — el LLM responde con el contexto:
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: pregunta },
        ],
        max_tokens: 600,
      }),
    },
  );
  const data = await res.json();

  // Red de seguridad: borrar menciones de archivos que el modelo cuele
  const respuestaLimpia = data.result.response
    .replace(/\(?\s*(source|ver|fuente|источник)\s*:\s*[\w-]+\.md\s*\)?/gi, "")
    .replace(/[\w-]+\.md/g, "her documents");

  return NextResponse.json({ respuesta: respuestaLimpia });
}
