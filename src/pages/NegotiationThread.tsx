import { type FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

async function fetchNegotiation(id?: string): Promise<Negotiation | null> {
  if (!id) return null;
  const { data, error } = await supabase
    .from("negotiations")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}
async function fetchCounters(id?: string): Promise<CounterOffer[]> {
  if (!id) return [];
  const { data, error } = await supabase
    .from("counter_offers")
    .select("*")
    .eq("negotiation_id", id)
    .order("votes", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export default function NegotiationThread() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: neg,
    isLoading: loadingNeg,
    error: negError,
  } = useQuery({
    queryKey: ["negotiations", id],
    queryFn: () => fetchNegotiation(id),
    enabled: Boolean(id),
  });
  const {
    data: counters,
    isLoading: loadingCounters,
    error: countersError,
  } = useQuery({
    queryKey: ["counter_offers", id],
    queryFn: () => fetchCounters(id),
    enabled: Boolean(id),
  });

  const voteNegotiation = useMutation({
    mutationFn: async (delta: 1 | -1) => {
      if (!neg) return;
      const { error } = await supabase
        .from("negotiations")
        .update({ votes: (neg.votes ?? 0) + delta })
        .eq("id", neg.id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["negotiations", id] }),
  });

  const voteCounter = useMutation({
    mutationFn: async (args: {
      counterId: string;
      currentVotes: number;
      delta: 1 | -1;
    }) => {
      const { counterId, currentVotes, delta } = args;
      const { error } = await supabase
        .from("counter_offers")
        .update({ votes: currentVotes + delta })
        .eq("id", counterId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["counter_offers", id] }),
  });

  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [justification, setJustification] = useState("");

  const addCounter = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("counter_offers").insert({
        negotiation_id: id,
        proposed_range_min: min,
        proposed_range_max: max,
        justification,
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      setMin(0);
      setMax(0);
      setJustification("");
      queryClient.invalidateQueries({ queryKey: ["counter_offers", id] });
    },
  });

  if (loadingNeg || loadingCounters) return <p>Loading...</p>;
  if (negError)
    return <p className="text-red-600">{(negError as Error).message}</p>;
  if (!neg) return <p>Not found</p>;
  if (countersError)
    return <p className="text-red-600">{(countersError as Error).message}</p>;

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
                onClick={() => voteNegotiation.mutate(1)}
                className="px-2 py-1 border rounded"
              >
                ▲
              </button>
              <button
                onClick={() => voteNegotiation.mutate(-1)}
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
          {(counters ?? []).map((c) => (
            <div key={c.id} className="rounded-md border bg-white p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  ${c.proposed_range_min.toLocaleString()} - $
                  {c.proposed_range_max.toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      voteCounter.mutate({
                        counterId: c.id,
                        currentVotes: c.votes,
                        delta: 1,
                      })
                    }
                    className="px-2 py-1 border rounded"
                  >
                    ▲
                  </button>
                  <span className="text-sm">{c.votes}</span>
                  <button
                    onClick={() =>
                      voteCounter.mutate({
                        counterId: c.id,
                        currentVotes: c.votes,
                        delta: -1,
                      })
                    }
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
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          addCounter.mutate();
        }}
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
        <button
          disabled={addCounter.isPending}
          className="inline-flex items-center rounded-md bg-black px-4 py-2 text-white"
        >
          {addCounter.isPending ? "Submitting..." : "Submit counter"}
        </button>
      </form>
    </div>
  );
}
