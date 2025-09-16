import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import type { Negotiation } from "../types/negotiationTypes";

async function fetchNegotiations(): Promise<Negotiation[]> {
  const { data, error } = await supabase
    .from("negotiations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Negotiation[];
}

export default function NegotiationsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["negotiations", "list"],
    queryFn: fetchNegotiations,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{(error as Error).message}</p>;

  const items = data ?? [];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Negotiations</h2>
      <ul className="divide-y rounded-md border bg-white">
        {items.map((n) => (
          <li key={n.id} className="p-4">
            <a href={`/negotiations/${n.id}`} className="block">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{n.job_title}</p>
                  <p className="text-sm text-gray-600">
                    YOE: {n.years_of_experience}
                    {n.location ? ` • ${n.location}` : ""}
                  </p>
                </div>
                <p className="text-sm font-semibold">
                  ${n.proposed_range_min.toLocaleString()} - $
                  {n.proposed_range_max.toLocaleString()}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
