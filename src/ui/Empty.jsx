import styled from "styled-components";

const StyledEmpty = styled.p`
  text-align: center;
  justify-content: center;
`;

function Empty({ resource }) {
  return <StyledEmpty>No {resource} could be found.</StyledEmpty>;
}

export default Empty;
