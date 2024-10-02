import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import Text from "../ui/Text";
import Hero from "../ui/Hero";
import Footer from "../ui/Footer";
import Logo from "../ui/Logo";
const Main = styled.main`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background-color: var(--color-grey-300);
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const DivImg = styled.div`
  width: 35%;
  border-radius: 8px;
  display: flex;
  gap: 1rem;
  overflow-x: hidden;
  z-index: 100;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 700px) {
    width: 80%;
  }
`;
const Img = styled.img`
  width: 100%;
  aspect-ratio: 1;
  /* background-size: cover;
  background-position: center; */
  border-radius: 8px;
  animation: 7s ease-in slidein; /* Slightly reduced to smoothen the transition */

  @keyframes slidein {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-600%);
    }
  }
`;
function StartPage1() {
  return (
    <Main>
      <Nav>
        <Logo>Welcome to SUB-C</Logo>
        <Link to="/login">
          <Button size="meduim" variations="primary">
            order now
          </Button>
        </Link>
      </Nav>

      <Hero>
        <DivImg>
          <Img src="/img/0.jpg" alt="food" />
          <Img src="/img/1.jpg" alt="food" />
          <Img src="/img/2.jpg" alt="food" />
          <Img src="/img/3.jpg" alt="food" />
        </DivImg>
        <Text />
      </Hero>
      <Footer />
    </Main>
  );
}

export default StartPage1;
