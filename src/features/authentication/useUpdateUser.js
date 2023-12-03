import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => toast.error(error.message),
  });
  return { updateUser, isUpdating };
}
