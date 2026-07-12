# Maria Juliana — Portfolio + AskMaria (RAG Assistant)

**Live: [portafolio-chi-two-17.vercel.app](https://portafolio-chi-two-17.vercel.app)**

Trilingual portfolio (EN / ES / RU) with **AskMaria** built in — a Retrieval-Augmented
Generation (RAG) assistant that answers recruiters' questions about my experience,
projects and skills, in three languages, grounded in my actual documents.

> Try it: open the portfolio, click the ✦ button and ask *"Has Maria worked with Docker?"*
> — or ask in Spanish or Russian.

---

## ✦ How AskMaria works

**Ingestion pipeline** (`scripts/ingest.ts`):
1. Markdown documents about my experience (`docs/`) are split into ~500-char chunks
   by paragraph boundaries
2. Each chunk is prefixed with its source and embedded with **bge-m3**
   (Cloudflare Workers AI) → a 1024-dimension vector
3. Chunks + embeddings are stored in **PostgreSQL with pgvector**

**Query pipeline** (`app/api/ask/route.ts`):
1. **Retrieval** — the question is embedded with the same model, and the top-8
   nearest chunks are retrieved via k-NN cosine search (pgvector's `<=>` operator)
2. **Augmentation** — retrieved chunks are injected into the system prompt with
   source attribution and anti-hallucination rules
3. **Generation** — Llama 3.1 8B answers in the user's language (ES/EN/RU),
   with a sanitization layer cleaning the model's output before it reaches the UI

## 🛠️ Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS |
| i18n | next-intl — localized routes `/en` `/es` `/ru` |
| Vector DB | PostgreSQL + pgvector (Supabase in production, Docker locally) |
| Embeddings | Cloudflare Workers AI — `bge-m3` (multilingual, 1024 dims) |
| LLM | Cloudflare Workers AI — `llama-3.1-8b-instruct` |
| ORM | Prisma 6 (raw SQL for vector operations) |
| Deploy | Vercel (CI/CD from this repo) |

## 🏗️ Architecture notes

- **Multilingual retrieval**: bge-m3 embeds semantically across languages, so a
  question in Russian retrieves relevant chunks written in English
- **Prisma + pgvector**: the `vector(1024)` column uses Prisma's `Unsupported` type;
  vector queries run through `$queryRaw` — the ORM handles everything else
- **Defense in depth**: formatting rules live in the system prompt AND in a
  post-processing sanitization step — LLM output is never trusted blindly

## 🚀 Run locally

```bash
npm install

# pgvector in Docker
docker run --name askdb -e POSTGRES_PASSWORD=askpass123 \
  -e POSTGRES_DB=askmaria -p 5433:5432 -d pgvector/pgvector:pg16

# Env vars (see .env.example): DATABASE_URL, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN

npx prisma migrate dev        # schema + vector extension
npx tsx scripts/ingest.ts     # chunk + embed + store the docs
npm run dev
```

---

Built by **Maria Juliana Arias** · [GitHub](https://github.com/Marias03) · Kazan, Russia
