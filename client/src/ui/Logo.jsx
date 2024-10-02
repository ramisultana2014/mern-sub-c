import styled from "styled-components";

const Logo = styled.p`
  font-size: 2rem;
  color: ${(props) =>
    props.col === "black" ? "black" : "var(--color-green-700)"};

  font-weight: 600;
  text-align: center;
`;
export default Logo;
