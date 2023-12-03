import { HiOutlineMoon, HiSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
