import { supabase, type Guest } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getGuests(): Promise<Guest[]> {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Dashboard fetch error:", error.message, error.code);
    return [];
  }
  return data ?? [];
}

export default async function Dashboard() {
  const guests = await getGuests();
  const totalPeople = guests.reduce((sum, g) => sum + g.companion_names.length + 1, 0);

  return (
    <main className="min-h-screen bg-[#f0faf4] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-[#2d6a4f]">
            Formatura da Gi 🎓
          </h1>
          <p className="text-[#40916c] mt-1">
            <span className="font-semibold">{guests.length}</span> confirmação{guests.length !== 1 ? "s" : ""}{" "}
            ·{" "}
            <span className="font-semibold">{totalPeople}</span> pessoa{totalPeople !== 1 ? "s" : ""} no total
          </p>
        </div>

        {guests.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-400 shadow-sm">
            Nenhuma confirmação ainda. 🌱
          </div>
        ) : (
          <div className="space-y-3">
            {guests.map((guest) => (
              <div key={guest.id} className="bg-white rounded-2xl shadow-sm border border-green-50 p-4 flex gap-4">
                <div className="bg-[#d8f3dc] text-[#2d6a4f] rounded-full w-11 h-11 flex items-center justify-center font-bold text-lg shrink-0 font-display">
                  {guest.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-gray-800">{guest.name}</span>
                    <span className="text-xs text-gray-400 shrink-0 mt-0.5">
                      {new Date(guest.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 mt-0.5">
                    {guest.companion_names.length === 0
                      ? "1 pessoa"
                      : `${guest.companion_names.length + 1} pessoas`}
                  </p>

                  {guest.companion_names.length > 0 && (
                    <ul className="mt-2 space-y-0.5">
                      {guest.companion_names.map((c: string, i: number) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#6b8f71] shrink-0 mt-px" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}

                  {guest.message && (
                    <p className="text-sm text-gray-500 mt-1.5 italic">"{guest.message}"</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
