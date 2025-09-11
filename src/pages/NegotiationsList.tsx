import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export type Negotiation = {
  id: string;
  created_at: string;
  user_id: string;
  job_title: string;
  location: string | null;
  years_of_experience: number;
  proposed_range_min: number;
  proposed_range_max: number;
  justification: string;
};

export default function NegotiationsList() {
  const [items, setItems] = useState<Negotiation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("negotiations")
        .select("*")
        .order("created_at", { ascending: false });
      if (!ignore) {
        if (error) setError(error.message);
        else setItems(data ?? []);
        setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

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
