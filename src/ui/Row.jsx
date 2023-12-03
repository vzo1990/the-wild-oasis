import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(prop) =>
    prop.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}

  ${(prop) =>
    prop.type === "horizontal" &&
    css`
      align-items: center;
      justify-content: space-between;
    `}
`;

Row.defaultProps = { type: "vertical" };

export default Row;
