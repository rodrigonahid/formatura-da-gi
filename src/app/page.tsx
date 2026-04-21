"use client";

import { useState } from "react";
import { submitRsvp } from "./actions";

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "40px",
  background: "#fff",
  border: "1.5px solid #a8bfac",
  borderRadius: "10px",
  padding: "0 14px",
  fontSize: "15px",
  color: "#1f3528",
};

export default function Home() {
  const [companions, setCompanions] = useState<string[]>(["", "", ""]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function addCompanion() {
    setCompanions((prev) => [...prev, ""]);
    setTimeout(() => {
      const inputs = document.querySelectorAll<HTMLInputElement>('input[name="companion_name"]');
      inputs[inputs.length - 1]?.focus();
    }, 50);
  }

  function updateCompanion(index: number, value: string) {
    setCompanions((prev) => prev.map((c, i) => (i === index ? value : c)));
  }

  function removeCompanion(index: number) {
    setCompanions((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const result = await submitRsvp(new FormData(e.currentTarget));
    if (result?.error) {
      setErrorMsg(result.error);
      setStatus("error");
    } else {
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <main style={{ minHeight: "100vh", background: "#f5f0e8", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div className="fade-in" style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <div style={{ background: "#fff", border: "1.5px solid #c8c4aa", borderRadius: "14px", padding: "40px 32px" }}>
            <span style={{ display: "inline-block", background: "#6b8f71", color: "#e8f0e8", padding: "5px 14px", borderRadius: "99px", fontSize: "13px", letterSpacing: "1px", marginBottom: "20px" }}>
              ✦ PRESENÇA CONFIRMADA ✦
            </span>
            <p style={{ fontSize: "22px", fontWeight: 500, color: "#1f3528", marginBottom: "8px" }}>Até lá!</p>
            <p style={{ fontSize: "14px", color: "#3a5c44" }}>A Gi vai adorar ter você na formatura dela.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f5f0e8", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div className="fade-in" style={{ maxWidth: "400px", width: "100%" }}>

        <div style={{ background: "#fff", border: "1.5px solid #c8c4aa", borderRadius: "14px", padding: "12px" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "22px" }}>
            <span style={{ display: "inline-block", background: "#6b8f71", color: "#e8f0e8", padding: "5px 14px", borderRadius: "99px", fontSize: "13px", letterSpacing: "1px", marginBottom: "14px" }}>
              ✦ FORMATURA 2025 ✦
            </span>
            <p style={{ fontSize: "22px", fontWeight: 500, color: "#1f3528", margin: "0 0 6px" }}>
              Confirme sua presença
            </p>
            <p style={{ fontSize: "14px", color: "#3a5c44", margin: 0 }}>
              Festa de formatura da Gi — preencha seus dados abaixo
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* Name */}
            <div>
              <label style={{ display: "block", fontSize: "14px", color: "#3a5c44", marginBottom: "6px" }}>
                Seu nome
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Como você se chama?"
                style={inputStyle}
              />
            </div>

            {/* Companions */}
            <div>
              {/* Label row with + button */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <label style={{ fontSize: "14px", color: "#3a5c44" }}>
                  Acompanhantes
                </label>
                <button
                  type="button"
                  onClick={addCompanion}
                  title="Adicionar acompanhante"
                  style={{
                    width: "28px", height: "28px",
                    background: "#6b8f71", color: "#fff",
                    border: "none", borderRadius: "8px",
                    fontSize: "18px", lineHeight: 1,
                    cursor: "pointer", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontWeight: 400, flexShrink: 0,
                  }}
                >
                  +
                </button>
              </div>

              {/* Companion inputs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {companions.map((name, i) => (
                  <div key={i} className="slide-down" style={{ position: "relative" }}>
                    <input
                      name="companion_name"
                      type="text"
                      value={name}
                      onChange={(e) => updateCompanion(i, e.target.value)}
                      placeholder={`Acompanhante ${i + 1}`}
                      style={{ ...inputStyle, paddingRight: "42px" }}
                    />
                    <button
                      type="button"
                      onClick={() => removeCompanion(i)}
                      title="Remover"
                      style={{
                        position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)",
                        background: "none", border: "none", cursor: "pointer",
                        color: "#d9534f", display: "flex", alignItems: "center", padding: "4px",
                      }}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add companion button */}
              <button
                type="button"
                onClick={addCompanion}
                style={{
                  width: "100%",
                  marginTop: "8px",
                  background: "#f0f7f2",
                  border: "1.5px solid #6b8f71",
                  borderRadius: "10px",
                  padding: "10px 12px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#3a5c44",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                + Adicionar acompanhante
              </button>
            </div>

            {/* Message */}
            <div>
              <label style={{ display: "block", fontSize: "14px", color: "#3a5c44", marginBottom: "6px" }}>
                Mensagem para a Gi <span style={{ color: "#8a9e8c", fontWeight: 400 }}>(opcional)</span>
              </label>
              <textarea
                name="message"
                rows={3}
                placeholder="Deixe um recado especial..."
                style={{
                  width: "100%",
                  background: "#fff",
                  border: "1.5px solid #a8bfac",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  fontSize: "15px",
                  color: "#1f3528",
                  resize: "none",
                }}
              />
            </div>

            {status === "error" && (
              <p style={{ fontSize: "14px", color: "#c0392b", textAlign: "center", margin: 0 }}>
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                width: "100%",
                background: "#6b8f71",
                color: "#e8f0e8",
                border: "none",
                borderRadius: "10px",
                padding: "11px",
                fontSize: "15px",
                fontWeight: 500,
                cursor: status === "loading" ? "not-allowed" : "pointer",
                opacity: status === "loading" ? 0.7 : 1,
              }}
            >
              {status === "loading" ? "Confirmando..." : "Confirmar presença"}
            </button>

          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#8a9e8c", marginTop: "16px" }}>
          Festa da Gi &mdash; 2025
        </p>

      </div>
    </main>
  );
}
