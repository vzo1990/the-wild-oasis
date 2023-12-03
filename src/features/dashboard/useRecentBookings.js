import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export default function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last");
  const dateISO = subDays(new Date(), numDays).toISOString();

  const { data: recentBookings, isLoading: isRecentLoading } = useQuery({
    queryKey: ["recentBookings", `after-${numDays}`],
    queryFn: () => getBookingsAfterDate(dateISO),
  });

  return { recentBookings, isRecentLoading, numDays };
}
