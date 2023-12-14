import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CabinForm from "./CabinForm";
import useDeleteCabin from "./useDeleteCabin";
import {
  HiOutlinePencilSquare,
  HiOutlineSquare2Stack,
  HiOutlineTrash,
} from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { id, image, name, maxCapacity, regularPrice, discount } = cabin;

  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  function handleClone() {
    createCabin({
      name: `Copy of ${cabin.name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
    });
  }

  return (
    <Modal>
      <Modal.Open name="editCabinForm" onAction="onDoubleClick">
        <Table.Row role="row">
          <Img src={image} />
          <Cabin>{name}</Cabin>
          <div>Fits up to {maxCapacity} guests</div>
          <Price>{formatCurrency(regularPrice)}</Price>
          <Discount>{discount > 0 ? formatCurrency(discount) : "-"}</Discount>

          <Menus.Menu>
            <Menus.Toggle id={cabin.id} />

            <Menus.List id={cabin.id}>
              <Menus.Button
                icon={<HiOutlineSquare2Stack />}
                onClick={handleClone}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open name="editCabinForm">
                <Menus.Button icon={<HiOutlinePencilSquare />}>
                  Edit
                </Menus.Button>
              </Modal.Open>

              <Modal.Open name="deleteCabin">
                <Menus.Button icon={<HiOutlineTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
        </Table.Row>
      </Modal.Open>
      <Modal.Content name="editCabinForm">
        <CabinForm cabin={cabin} />
      </Modal.Content>
      <Modal.Content name="deleteCabin">
        <ConfirmDelete
          resourceName={"cabin"}
          disabled={isDeleting}
          onConfirm={() => deleteCabin(id)}
        />
      </Modal.Content>
    </Modal>
  );
}
