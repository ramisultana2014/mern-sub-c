import styled from "styled-components";
import Items3B from "./Items3B";
import Heading from "./Heading";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 80%;
`;
function Veggies({ veggies }) {
  return (
    <Div>
      <Heading as="h1">Veggies</Heading>
      <p>select up to 6</p>
      {veggies.map((item) => (
        <Items3B item={item} key={item.title} />
      ))}
    </Div>
  );
}

export default Veggies;
