import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin as updateCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: updateCabinApi,
    onSuccess: () => {
      toast.success("Cabin updated successfully!");
      queryClient.invalidateQueries("cabins");
    },
    onError: (error) => toast.error(error.message),
  });
  return { updateCabin, isUpdating };
}
