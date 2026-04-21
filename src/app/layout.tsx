import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Formatura da Gi 🎓",
  description: "Confirme sua presença na festa de formatura da Gi!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
