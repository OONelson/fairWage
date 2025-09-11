import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";

export default function NewNegotiation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [yoe, setYoe] = useState<number>(3);
  const [min, setMin] = useState<number>(120000);
  const [max, setMax] = useState<number>(140000);
  const [justification, setJustification] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createNegotiation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("negotiations")
        .insert({
          job_title: jobTitle,
          location: location || null,
          years_of_experience: yoe,
          proposed_range_min: min,
          proposed_range_max: max,
          justification,
        })
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["negotiations", "list"] });
      navigate(`/negotiations/${data!.id}`);
    },
    onError: (err) => setError((err as Error).message),
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    createNegotiation.mutate();
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">Start a Negotiation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="border rounded px-3 py-2"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="number"
            className="border rounded px-3 py-2"
            placeholder="Years of Experience"
            value={yoe}
            onChange={(e) => setYoe(Number(e.target.value))}
            min={0}
          />
          <input
            type="number"
            className="border rounded px-3 py-2"
            placeholder="Proposed min"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            min={0}
          />
          <input
            type="number"
            className="border rounded px-3 py-2"
            placeholder="Proposed max"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            min={0}
          />
        </div>
        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Justification"
          rows={6}
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
          required
        />
        <button
          disabled={createNegotiation.isPending}
          className="inline-flex items-center rounded-md bg-black px-4 py-2 text-white"
        >
          {createNegotiation.isPending ? "Creating..." : "Create"}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}
