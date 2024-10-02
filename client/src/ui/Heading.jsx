import styled, { css } from "styled-components";
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  @media screen and  (max-width: 700px) {
    text-align: center;
  }
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 1.6rem;
      font-weight: 400;
    `}
`;
export default Heading;
