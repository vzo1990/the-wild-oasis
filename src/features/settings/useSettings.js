import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export default function useSettings() {
  const { data: settings, isLoading: isSettingsLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { settings, isSettingsLoading };
}
