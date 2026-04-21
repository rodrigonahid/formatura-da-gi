import { createClient } from "@supabase/supabase-js";

export type Guest = {
  id: number;
  name: string;
  companion_names: string[];
  message: string | null;
  created_at: string;
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
