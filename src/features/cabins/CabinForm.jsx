import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

function CabinForm({ cabin = {}, onClose }) {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: cabin,
  });
  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();
  const isPending = isCreating || isUpdating;

  function onSubmit(data) {
    if (cabin?.id)
      updateCabin(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    else
      createCabin(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isPending}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 2,
              message: "Maximum capacity should be between 2 and 10",
            },
            max: {
              value: 10,
              message: "Maximum capacity should be between 2 and 10",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isPending}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 10, message: "Price could not be less than 10" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          defaultValue={0}
          {...register("discount", {
            validate: (value, formValues) =>
              +value < +formValues.regularPrice ||
              "Discount should be less than Regular Price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isPending}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        {cabin?.image && <img src={cabin.image} alt={cabin.image} />}
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button onClick={onClose} $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>
          {cabin?.id ? "Save cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CabinForm;
