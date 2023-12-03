import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinForm from "./CabinForm";

export default function AddCabinButton() {
  return (
    <div>
      <Modal>
        <Modal.Open name="cabinForm">
          <Button>Add Cabin</Button>
        </Modal.Open>

        <Modal.Content name="cabinForm">
          <CabinForm />
        </Modal.Content>
      </Modal>
    </div>
  );
}
