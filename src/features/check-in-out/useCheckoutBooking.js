import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckoutBooking() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (id) => updateBooking(id, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out! `);
      queryClient.invalidateQueries("booking");
    },
  });
  return { checkout, isCheckingOut };
}
