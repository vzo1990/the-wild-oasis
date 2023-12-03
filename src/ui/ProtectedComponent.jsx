import { useEffect } from "react";
import useUser from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

export default function ProtectedComponent({ children }) {
  const { user, isUserLoading } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!user && !isUserLoading) navigate("/login");
    },
    [user, isUserLoading, navigate]
  );

  if (isUserLoading) return <Spinner />;

  if (!user) return null;

  if (user?.role === "authenticated") return children;
}
