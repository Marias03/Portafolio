"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useTranslations, useLocale } from "next-intl";

type Mensaje = {
  rol: "user" | "bot";
  texto: string;
};

export default function AskMaria() {
  const t = useTranslations("askMaria");
  const locale = useLocale();
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { rol: "bot", texto: t("saludo") },
  ]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);

  async function enviar() {
    if (!input.trim() || cargando) return;

    const miPregunta = input;
    setMensajes((prev) => [...prev, { rol: "user", texto: miPregunta }]);
    setInput("");
    setCargando(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta: miPregunta, locale }),
      });
      const data = await res.json();
      setMensajes((prev) => [...prev, { rol: "bot", texto: data.respuesta }]);
    } catch {
      setMensajes((prev) => [...prev, { rol: "bot", texto: t("error") }]);
    }
    setCargando(false);
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setAbierto(!abierto)}
        aria-label="AskMaria chat"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-violet-600 text-white text-2xl shadow-lg hover:scale-110 transition z-50"
      >
        {abierto ? "✕" : "✦"}
      </button>

      {/* Ventana del chat */}
      {abierto && (
        <div className="fixed bottom-24 right-6 w-96 h-[32rem] max-w-[calc(100vw-3rem)] bg-white rounded-3xl border border-violet-200 shadow-xl flex flex-col overflow-hidden z-50">
          {/* Header */}
          <div className="bg-violet-600 text-white px-4 py-3">
            <p className="font-bold leading-tight">✦ AskMaria</p>
            <p className="text-xs text-violet-200">{t("subtitulo")}</p>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {mensajes.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 text-sm ${
                  m.rol === "user"
                    ? "bg-violet-600 text-white ml-auto rounded-2xl rounded-br-sm"
                    : "bg-violet-50 text-violet-950 rounded-2xl rounded-bl-sm"
                }`}
              >
                {m.rol === "bot" ? (
                  <div className="prose prose-sm prose-violet max-w-none [&_p]:my-1 [&_ol]:my-1 [&_ul]:my-1 [&_li]:my-1">
                    <ReactMarkdown>{m.texto}</ReactMarkdown>
                  </div>
                ) : (
                  m.texto
                )}
              </div>
            ))}
            {cargando && (
              <div className="text-violet-400 text-sm">✦ {t("pensando")}</div>
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-violet-100 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviar()}
              placeholder={t("placeholder")}
              className="flex-1 px-3 py-2 rounded-full border border-violet-200 text-sm text-violet-950 outline-none focus:border-violet-500"
            />
            <button
              onClick={enviar}
              aria-label="Send"
              className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0"
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}
