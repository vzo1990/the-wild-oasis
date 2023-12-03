import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      toast.success(`Welcome to the app`);
      navigate("/dashboard");
    },
    onError: (error) => toast.error(error.message),
  });

  return { login, isLoggingIn };
}
