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
function Seasonings({ seasonings }) {
  return (
    <Div>
      <Heading as="h1">Seasonings</Heading>
      <p> you can select all</p>
      {seasonings.map((item) => (
        <Item1B item={item} key={item.title} />
      ))}
    </Div>
  );
}

export default Seasonings;
