import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export default function useBooking() {
  const { id } = useParams();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false,
  });

  return { booking, isLoading };
}
