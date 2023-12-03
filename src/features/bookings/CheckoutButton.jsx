import Button from "../../ui/Button";
import useCheckoutBooking from "../check-in-out/useCheckoutBooking";

export default function CheckoutButton({ id }) {
  const { checkout, isCheckingOut } = useCheckoutBooking();
  return (
    <Button
      $variation="primary"
      onClick={() => checkout(id)}
      disabled={isCheckingOut}
    >
      Checkout
    </Button>
  );
}
