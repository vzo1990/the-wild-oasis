import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CheckoutButton from "./CheckoutButton";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const navigate = useNavigate();

  const moveBack = useMoveBack();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resource="booking" />;

  const { id, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>

        <Modal>
          <Modal.Open name="delete">
            <Button $variation="danger" disabled={isDeletingBooking}>
              Delete
            </Button>
          </Modal.Open>
          <Modal.Content name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBooking(id, {
                  onSuccess: moveBack,
                })
              }
            />
          </Modal.Content>
        </Modal>
        {status === "unconfirmed" && (
          <Button
            $variation="primary"
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Checkin
          </Button>
        )}
        {status === "checked-in" && <CheckoutButton id={id} />}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
