import styled from "styled-components";
const Hero = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

export default Hero;
