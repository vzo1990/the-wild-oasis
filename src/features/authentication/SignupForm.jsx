import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";

function SignupForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const { signUp, isSigningUp } = useSignUp();

  function onSubmit({ fullName, email, password }) {
    signUp({ fullName, email, password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: /\S+@\S+\.\S+/,
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password should have at least 8 characters",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value, fromValues) =>
              value === fromValues.password || "Passwords should match",
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSigningUp}>
          {isSigningUp ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
