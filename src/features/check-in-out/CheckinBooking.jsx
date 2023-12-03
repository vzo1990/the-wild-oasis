import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import useCheckinBooking from "./useCheckinBooking";
import { formatCurrency } from "../../utils/helpers";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const { booking, isLoading } = useBooking();
  const { settings, isSettingsLoading } = useSettings();

  const [confirmPaid, setConfirmPaid] = useState();
  const [breakfastPaid, setBreakfastPaid] = useState();
  const { checkin, isCheckingIn } = useCheckinBooking();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid);
    setBreakfastPaid(booking?.hasBreakfast);
  }, [booking]);

  if (isLoading || isSettingsLoading) return <Spinner />;

  const { id, guests, totalPrice, isPaid, numGuests, hasBreakfast, numNights } =
    booking;

  const optionalBreakfastPrice =
    numNights * numGuests * settings.breakfastPrice;

  function handleCheckin() {
    if (breakfastPaid)
      checkin({
        id,
        breakfast: {
          totalPrice: optionalBreakfastPrice + totalPrice,
          extrasPrice: optionalBreakfastPrice,
          hasBreakfast: true,
        },
      });
    else checkin({ id });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={breakfastPaid}
          id={"breakfastPaid"}
          disabled={hasBreakfast}
          onChange={() => {
            setBreakfastPaid((breakfastPaid) => !breakfastPaid);
            setConfirmPaid(false);
          }}
        >
          Wants to add breakfast for {formatCurrency(optionalBreakfastPrice)}
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={confirmPaid}
          id={"confirmPaid"}
          disabled={isPaid && confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!breakfastPaid
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{id}
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
