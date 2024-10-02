import styled from "styled-components";
import { testiMonial } from "../data/data-sandwich";
import Figure from "./Figure";
const DivTestimonial = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 75%;
  justify-items: center;
  align-items: center;
  background-color: var(--color-grey-200);
  box-shadow: var(--shadow-md);
  border-radius: 20px;
  padding: 2rem;

  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
function Testimonial() {
  return (
    <DivTestimonial>
      {testiMonial.map((per) => (
        <Figure key={per.name} person={per} />
      ))}
    </DivTestimonial>
  );
}

export default Testimonial;
