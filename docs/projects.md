# Projects

## SkinGuide — bilingual skincare guide with AI chatbot

A skincare product catalog with 65+ curated international products, combined filters
by skin need and budget range, and full EN/ES internationalization with next-intl.
Its chatbot, SkinBot, runs on Llama 3.1 8B via Cloudflare Workers AI: the system
prompt is built dynamically from live PostgreSQL data so it only recommends real
catalog products, it keeps full conversational memory by resending the chat history
on every request, and it answers in the user's language. Stack: Next.js, TypeScript,
Prisma, PostgreSQL in Docker, Tailwind CSS.

## LockPoint (Electronic Locker System) — production-ready booking system

A locker booking system for airports built during the MTS Web Services course at KFU:
multi-branch architecture, hourly pricing, and email PIN verification. It includes
real-time monitoring with 20+ custom Prometheus metrics and a Grafana dashboard, and
supports four languages (EN/ES/RU/ZH). Stack: Next.js, TypeScript, Prisma + PostgreSQL,
Docker Compose, i18next.

## PigeonFree — ML-powered pedestrian navigation

A navigation app that routes pedestrians in Kazan around pigeon-dense areas. Maria
collected and processed 1,554 observations from iNaturalist and eBird, enriched them
with weather and OpenStreetMap features, and trained a Random Forest with isotonic
calibration reaching ROC-AUC 0.997 (GroupKFold validation), plus YOLOv8 for image
validation. She configured her own OSRM routing server in Docker. Stack: FastAPI,
Next.js, scikit-learn, Supabase/PostGIS, Leaflet.

## AI Product Mentor — LLM assistant for product managers

A full-stack AI assistant with four specialized modes (product mentoring, user
stories, PRDs, and prioritization with RICE/MoSCoW/ICE frameworks), applying
domain-specific prompt engineering. It integrates a local LLM via Ollama (Llama 3.1
8B) through a FastAPI REST API, with a conversational Next.js frontend.

## AskMaria — this bot!

The assistant you are talking to right now: a RAG (Retrieval-Augmented Generation)
system built into Maria's portfolio. Her documents are chunked, embedded with bge-m3
via Cloudflare Workers AI, and stored in PostgreSQL with pgvector; each question is
answered using semantic (k-NN cosine) search over those chunks.
