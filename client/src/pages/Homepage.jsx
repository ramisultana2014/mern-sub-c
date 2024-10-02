import styled from "styled-components";
import Logo from "../ui/Logo";
import { imageSlide } from "../data/data-sandwich";
import { useNavigate } from "react-router-dom";
import Testimonial from "../ui/Testimonial";
import Footer from "../ui/Footer";

const StyledContt = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  padding: 0 4rem;
`;
const DivText = styled.div`
  box-shadow: var(--shadow-md);
  width: 100%;
`;
const DivImg = styled.div`
  display: grid;
  grid-template-columns: 30% 30%;
  gap: 1rem;
  justify-content: center;
  @media screen and (max-width: 700px) {
    grid-template-columns: 50%;
  }
`;
const Div = styled.button`
  overflow: hidden;
  border: none;
  background: none;
  border-radius: 8px;
`;
const Img = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  transition: all 1s;
  &:hover {
    transform: scale(1.1);
  }
`;
function Homepage() {
  const navigate = useNavigate();

  return (
    <StyledContt>
      <DivText>
        <Logo>sub-c</Logo>
        <Logo col="black"> from oven to your table</Logo>
        <Logo col="black">
          our product are fresh organic directly from our farms
        </Logo>
      </DivText>
      <DivImg>
        {imageSlide.map((img) => (
          <Div onClick={() => navigate(`${img.title}`)} key={img.title}>
            <Img src={img.url} alt="sandwish" />
          </Div>
        ))}
      </DivImg>
      <Testimonial />
      <Footer />
    </StyledContt>
  );
}

export default Homepage;
