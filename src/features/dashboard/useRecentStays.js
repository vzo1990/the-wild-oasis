import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export default function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last");
  const dateISO = subDays(new Date(), numDays).toISOString();

  const { data: recentStays, isLoading: isStaysLoading } = useQuery({
    queryKey: ["recentStays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(dateISO),
  });

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { recentStays, isStaysLoading, confirmedStays };
}
