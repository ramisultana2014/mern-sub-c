import styled from "styled-components";

import Heading from "./Heading";
import ItemBread from "./ItemBread";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 80%;
`;

function Bread({ bread }) {
  return (
    <Div>
      <Heading as="h1">bread</Heading>
      <p>select 1</p>
      {bread.map((item) => (
        <ItemBread item={item} key={item.title} />
      ))}
    </Div>
  );
}

export default Bread;
