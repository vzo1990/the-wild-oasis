import { useForm } from "react-hook-form";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledForm = styled.form`
  position: relative;
`;
const Icon = styled.div`
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledInput = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem 0.4rem 0.4rem 3.2rem;
  box-shadow: var(--shadow-sm);
`;

export default function Search({ placeholder = "Search..." }) {
  const [urlParams, setUrlParams] = useSearchParams();
  const { handleSubmit, register } = useForm({
    defaultValues: { searchQuery: urlParams.get("search") },
  });

  function onSubmit({ searchQuery }) {
    urlParams.delete("page");
    urlParams.set("search", searchQuery);
    setUrlParams(urlParams);
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Icon>
        <HiMagnifyingGlass />
      </Icon>

      <StyledInput placeholder={placeholder} {...register("searchQuery")} />
    </StyledForm>
  );
}
