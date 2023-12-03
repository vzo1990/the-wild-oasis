import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success(`Booking was successfully deleted!`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => {
      toast.error(`Booking was not deleted`);
    },
  });

  return { deleteBooking, isDeletingBooking };
}
