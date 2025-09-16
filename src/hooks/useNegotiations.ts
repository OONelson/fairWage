import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useNegotiations = () => {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [yoe, setYoe] = useState<number>();
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();
  const [justification, setJustification] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  return {
    createNegotiation,
    jobTitle,
    setJobTitle,
    location,
    setLocation,
    yoe,
    setYoe,
    min,
    setMin,
    max,
    setMax,
    justification,
    setJustification,
    error,
    setError,
  };
};

export default useNegotiations;
