import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success("Settings updated successfully!");
      queryClient.invalidateQueries("settings");
    },
    onError: (error) => toast.error(error.message),
  });
  return { updateSettings, isUpdating };
}
