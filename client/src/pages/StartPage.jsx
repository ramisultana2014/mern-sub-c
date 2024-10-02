import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
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
  height: 100vh;
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const DivImg = styled.div`
  width: 30%;
  aspect-ratio: 1;
  background-size: cover;
  background-position: center;
  border-radius: 8px;

  z-index: 100;

  ${(props) =>
    props.type === 0 &&
    css`
      background-image: linear-gradient(
          rgba(36, 42, 46, 0.2),
          rgba(36, 42, 46, 0.2)
        ),
        url("img/0.jpg");
    `}
  ${(props) =>
    props.type === 1 &&
    css`
      background-image: linear-gradient(
          rgba(36, 42, 46, 0.4),
          rgba(36, 42, 46, 0.4)
        ),
        url("img/1.jpg");
    `}
    ${(props) =>
    props.type === 2 &&
    css`
      background-image: linear-gradient(
          rgba(36, 42, 46, 0.4),
          rgba(36, 42, 46, 0.4)
        ),
        url("img/2.jpg");
    `}
    ${(props) =>
    props.type === 3 &&
    css`
      background-image: linear-gradient(
          rgba(36, 42, 46, 0.4),
          rgba(36, 42, 46, 0.4)
        ),
        url("img/3.jpg");
    `};

  @media screen and (max-width: 700px) {
    width: 80%;
  }
`;

function StartPage() {
  const [imgNum, setImgNum] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setImgNum((prevImgNum) => (prevImgNum + 1) % 4); // Loop through images 0 to 3
    }, 2500);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
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
        <DivImg type={imgNum}></DivImg>
        <Text />
      </Hero>
      <Footer />
    </Main>
  );
}

export default StartPage;
