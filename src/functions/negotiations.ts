import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const Negotiations = () => {
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
  };
};
