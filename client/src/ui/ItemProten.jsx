import styled from "styled-components";

const Div = styled.div`
  border: 2px solid var(--color-grey-800);
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  position: relative;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;
const DivItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Img = styled.img`
  width: 8rem;
  aspect-ratio: 1;
  border-radius: 50%;
`;
const StyledP = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
`;

function ItemProten({ item }) {
  return (
    <Div>
      <DivItem>
        <Img src={`/img/items/${item.image}`} alt={item.title} />
        <div>
          <StyledP>{item.title}</StyledP>
          <StyledP>{item.calories} Cals</StyledP>
        </div>
      </DivItem>
    </Div>
  );
}

export default ItemProten;
