import styled from "styled-components";
import Heading from "./Heading";
import ItemCheese from "./ItemCheese";
const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 80%;
`;
function CheeseGrilled({ chesse }) {
  //console.log(chesse);

  return (
    <Div>
      <Heading as="h1">Chesse</Heading>
      <p>select up to 2</p>
      {chesse.map((item) => (
        <ItemCheese item={item} key={item.title} />
      ))}
    </Div>
  );
}

export default CheeseGrilled;
