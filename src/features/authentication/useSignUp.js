import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignUp() {
  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => toast.success(`User successfully created`),
    onError: (error) => toast.error(`User was not created: ${error.message}`),
  });

  return { signUp, isSigningUp };
}
