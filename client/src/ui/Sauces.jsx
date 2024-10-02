import styled from "styled-components";
import Heading from "./Heading";
import Item1B from "./Item1B";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 80%;
  margin: 2rem 0;
`;
function Sauces({ sauces }) {
  return (
    <Div>
      <Heading as="h1">Sauces</Heading>
      <p> you can select all</p>
      {sauces.map((item) => (
        <Item1B item={item} key={item.title} />
      ))}
    </Div>
  );
}

export default Sauces;
