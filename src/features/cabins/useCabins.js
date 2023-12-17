import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

export default function useCabins() {
  const [urlParams] = useSearchParams();
  const search = urlParams.get("search");

  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins", search],
    queryFn: () => getCabins({ search }),
  });

  return { cabins, isLoading };
}
