import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { addKindVeggies, addVeggies, removeVeggie } from "../context/cartSlice";
import { useState } from "react";

const Div = styled.div`
  border: ${(props) =>
    props.type === "active"
      ? "2px solid var(--color-grey-800)"
      : "2px solid var(--color-grey-300)"};
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
const DivB = styled.div`
  grid-column: 1/3;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
function ItemBread({ item }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const sandwish = useSelector((state) => state.bag.sandwish);
  const breadItem = sandwish.filter((el) => el.category === "bread");
  //console.log(chesseIem.length);
  //console.log(sandwish);
  const isSelcted = sandwish?.find((el) => el.id === item._id);
  function handleAddIngrV(e) {
    e.preventDefault();
    const veggie = {
      id: item._id,
      category: "bread",
      cal: item.calories,
      title: item.title,
      kind: `${item.title} regular`,
    };
    dispatch(addVeggies(veggie));
  }
  function handleRegular() {
    dispatch(addKindVeggies({ id: item._id, kind: `${item.title} regular` }));
  }
  function handleToasted() {
    dispatch(addKindVeggies({ id: item._id, kind: `${item.title} toasted` }));
  }

  return (
    <Div
      type={isSelcted ? "active" : ""}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <DivItem>
        <Img src={`/img/items/${item.image}`} alt={item.title} />
        <div>
          <StyledP>{item.title}</StyledP>
          <StyledP>{item.calories} Cals</StyledP>
        </div>
      </DivItem>
      <div>
        {open && (
          <Button
            onClick={handleAddIngrV}
            disabled={isSelcted || 0 < breadItem.length}
            size="small"
            variations="primarItem"
          >
            add
          </Button>
        )}
        {isSelcted && (
          <Button
            onClick={() => dispatch(removeVeggie(item._id))}
            kind="remove"
            size="small"
          >
            remove
          </Button>
        )}
      </div>
      <DivB>
        {isSelcted && (
          <>
            <Button
              variations={
                isSelcted?.kind.includes("regular") ? "primarItem" : ""
              }
              size="item"
              onClick={handleRegular}
            >
              regular
            </Button>
            <Button
              variations={
                isSelcted?.kind.includes("toasted") ? "primarItem" : ""
              }
              size="item"
              onClick={handleToasted}
            >
              toasted
            </Button>
          </>
        )}
      </DivB>
    </Div>
  );
}

export default ItemBread;
