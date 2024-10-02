import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
const StyledLink = styled(Link)`
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${(props) =>
    props.line === "line" &&
    css`
      text-decoration: underline;
      font-size: 1.55rem;
    `}

  &:link,
  &:visited {
    color: var(--color-grey-700);
  }
  &:hover,
  &:active {
    color: var(--color-green-700);
    ${(props) =>
      props.line === "line" &&
      css`
        text-decoration: none;
      `}
    transition: all 0.5s;
  }
`;
export default StyledLink;
