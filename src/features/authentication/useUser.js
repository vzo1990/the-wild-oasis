import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export default function useUser() {
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });

  return { user, isUserLoading };
}
