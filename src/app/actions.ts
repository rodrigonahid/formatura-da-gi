"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function submitRsvp(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  const message = (formData.get("message") as string).trim() || null;
  const companionNames = formData
    .getAll("companion_name")
    .map((v) => (v as string).trim())
    .filter(Boolean);

  if (!name) return { error: "Nome é obrigatório." };

  const { error } = await supabase
    .from("guests")
    .insert({ name, companion_names: companionNames, message });

  if (error) {
    console.error("Supabase insert error:", error.message, error.code);
    return { error: "Erro ao confirmar. Tente novamente." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
