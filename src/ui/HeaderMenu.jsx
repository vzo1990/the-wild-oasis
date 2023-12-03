import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import SpinnerMini from "./SpinnerMini";
import { HiArrowRightOnRectangle, HiUserCircle } from "react-icons/hi2";
import useLogout from "../features/authentication/useLogout";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: end;
`;

export default function HeaderMenu() {
  const { logout, isLoggingOut } = useLogout();
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiUserCircle />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <ButtonIcon onClick={logout} disabled={isLoggingOut}>
          {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </ButtonIcon>
      </li>
    </StyledHeaderMenu>
  );
}
