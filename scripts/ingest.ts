import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// ---------- BLOQUE 1: leer los .md ----------
function leerDocs(): { texto: string; fuente: string }[] {
  const carpeta = path.join(process.cwd(), "docs");
  const archivos = fs.readdirSync(carpeta).filter((f) => f.endsWith(".md"));

  return archivos.map((archivo) => ({
    texto: fs.readFileSync(path.join(carpeta, archivo), "utf-8"),
    fuente: archivo,
  }));
}

// ---------- BLOQUE 2: trocear (chunking) ----------
function trocear(texto: string): string[] {
  // Corta por párrafos (doble salto de línea) y agrupa hasta ~500 caracteres
  const parrafos = texto
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
  const chunks: string[] = [];
  let actual = "";

  for (const p of parrafos) {
    if ((actual + "\n\n" + p).length > 500 && actual) {
      chunks.push(actual);
      actual = p;
    } else {
      actual = actual ? actual + "\n\n" + p : p;
    }
  }
  if (actual) chunks.push(actual);
  return chunks;
}

// ---------- BLOQUE 3: pedir el embedding a Cloudflare ----------
async function embeber(texto: string): Promise<number[]> {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/baai/bge-m3`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`, // 👈 hueco A
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: [texto] }),
    },
  );
  const data = await res.json();
  return data.result.data[0]; // el array de 1024 números
}

// ---------- BLOQUE 4: guardar todo ----------
async function main() {
  await prisma.chunk.deleteMany(); // ingesta repetible, como el seed 😏
  const docs = leerDocs();
  let total = 0;

  for (const doc of docs) {
    const chunks = trocear(doc.texto);
    for (const chunk of chunks) {
      const vector = await embeber(chunk);

      // $executeRaw porque el tipo vector es Unsupported para Prisma:
      await prisma.$executeRaw`
        INSERT INTO "Chunk" (contenido, fuente, embedding)
        VALUES (${chunk}, ${doc.fuente}, ${`[${vector.join(",")}]`}::vector)
      `;
      total++;
      console.log(`✅ ${doc.fuente} → chunk ${total} (${chunk.length} chars)`);
    }
  }
  console.log(`\n🌱 Ingesta completa: ${total} chunks vectorizados`);
}

main()
  .catch((e) => {
    console.error("💥", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
