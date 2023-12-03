import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useMoveBack } from "../../hooks/useMoveBack";

export default function useCheckinBooking() {
  const back = useMoveBack();
  const queryClient = useQueryClient();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ id, breakfast }) =>
      updateBooking(id, { isPaid: true, status: "checked-in", ...breakfast }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in! `);
      queryClient.invalidateQueries("booking");
      back();
    },
  });
  return { checkin, isCheckingIn };
}
