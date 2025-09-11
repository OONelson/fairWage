import { type FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export type CounterOffer = {
  id: string;
  negotiation_id: string;
  user_id: string;
  proposed_range_min: number;
  proposed_range_max: number;
  justification: string;
  votes: number;
};

type Negotiation = {
  id: string;
  created_at: string;
  user_id: string;
  job_title: string;
  location: string | null;
  years_of_experience: number;
  proposed_range_min: number;
  proposed_range_max: number;
  justification: string;
  votes?: number;
};

export default function NegotiationThread() {
  const { id } = useParams();
  const [neg, setNeg] = useState<Negotiation | null>(null);
  const [counters, setCounters] = useState<CounterOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [justification, setJustification] = useState("");

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      const [{ data: n, error: e1 }, { data: cs, error: e2 }] =
        await Promise.all([
          supabase.from("negotiations").select("*").eq("id", id).single(),
          supabase
            .from("counter_offers")
            .select("*")
            .eq("negotiation_id", id)
            .order("votes", { ascending: false }),
        ]);
      if (!ignore) {
        if (e1) setError(e1.message);
        else setNeg(n);
        if (e2) setError(e2.message);
        else setCounters(cs ?? []);
        setLoading(false);
      }
    }
    load();
    const sub = supabase
      .channel("public:counter_offers")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "counter_offers",
          filter: `negotiation_id=eq.${id}`,
        },
        () => load()
      )
      .subscribe();
    return () => {
      ignore = true;
      supabase.removeChannel(sub);
    };
  }, [id]);

  async function voteOnNegotiation(delta: 1 | -1) {
    if (!neg) return;
    await supabase
      .from("negotiations")
      .update({ votes: (neg.votes ?? 0) + delta })
      .eq("id", neg.id);
  }
  async function voteOnCounter(
    counterId: string,
    currentVotes: number,
    delta: 1 | -1
  ) {
    await supabase
      .from("counter_offers")
      .update({ votes: currentVotes + delta })
      .eq("id", counterId);
  }
  async function addCounter(e: FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("counter_offers").insert({
      negotiation_id: id,
      proposed_range_min: min,
      proposed_range_max: max,
      justification,
    });
    if (error) setError(error.message);
    setMin(0);
    setMax(0);
    setJustification("");
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!neg) return <p>Not found</p>;

  return (
    <div className="space-y-6">
      <div className="rounded-md border bg-white p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{neg.job_title}</h2>
            <p className="text-gray-600 text-sm">
              YOE: {neg.years_of_experience}
              {neg.location ? ` • ${neg.location}` : ""}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">
              ${neg.proposed_range_min.toLocaleString()} - $
              {neg.proposed_range_max.toLocaleString()}
            </p>
            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                onClick={() => voteOnNegotiation(1)}
                className="px-2 py-1 border rounded"
              >
                ▲
              </button>
              <button
                onClick={() => voteOnNegotiation(-1)}
                className="px-2 py-1 border rounded"
              >
                ▼
              </button>
            </div>
          </div>
        </div>
        <p className="mt-3 text-gray-800">{neg.justification}</p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Counter offers</h3>
        <div className="space-y-3">
          {counters.map((c) => (
            <div key={c.id} className="rounded-md border bg-white p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  ${c.proposed_range_min.toLocaleString()} - $
                  {c.proposed_range_max.toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => voteOnCounter(c.id, c.votes, 1)}
                    className="px-2 py-1 border rounded"
                  >
                    ▲
                  </button>
                  <span className="text-sm">{c.votes}</span>
                  <button
                    onClick={() => voteOnCounter(c.id, c.votes, -1)}
                    className="px-2 py-1 border rounded"
                  >
                    ▼
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mt-2">{c.justification}</p>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={addCounter}
        className="rounded-md border bg-white p-4 space-y-3"
      >
        <h4 className="font-semibold">Add a counter offer</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="number"
            className="border rounded px-3 py-2"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
          />
          <input
            type="number"
            className="border rounded px-3 py-2"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
          />
        </div>
        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Justification"
          rows={4}
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
        />
        <button className="inline-flex items-center rounded-md bg-black px-4 py-2 text-white">
          Submit counter
        </button>
      </form>
    </div>
  );
}
