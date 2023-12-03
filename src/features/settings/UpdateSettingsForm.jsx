import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuests,
      breakfastPrice,
    } = {},
    isSettingsLoading,
  } = useSettings();

  const { updateSettings } = useUpdateSettings();

  function handleBlur(e) {
    if (!e.target.value) return;

    e.target.disabled = true;
    updateSettings(
      { [e.target.id]: e.target.value },
      { onSuccess: () => (e.target.disabled = false) }
    );
  }

  if (isSettingsLoading) return <Spinner />;

  return (
    <Form onBlur={handleBlur}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input type="number" id="maxGuests" defaultValue={maxGuests} />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
