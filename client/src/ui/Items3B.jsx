import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import {
  addKindCheese,
  addKindVeggies,
  addVeggies,
  removeVeggie,
} from "../context/cartSlice";
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
function Items3B({ item }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const sandwish = useSelector((state) => state.bag.sandwish);
  //console.log(sandwish);
  const isSelcted = sandwish?.find((el) => el.id === item._id);
  function handleAddIngrV(e) {
    e.preventDefault();
    const veggie = {
      id: item._id,
      cal: item.calories,
      title: item.title,
      kind: `${item.title} regular`,
    };
    dispatch(addVeggies(veggie));
  }
  function handleRegular() {
    if (item.category === "veggies") {
      dispatch(addKindVeggies({ id: item._id, kind: `${item.title} regular` }));
    }
    if (item.category === "protein") {
      dispatch(
        addKindCheese({
          id: item._id,
          kind: `${item.title} regular`,
          cal: item.calories,
        })
      );
    }
  }
  function handleLess() {
    if (item.category === "veggies") {
      dispatch(addKindVeggies({ id: item._id, kind: `${item.title} less` }));
    }
    if (item.category === "protein") {
      dispatch(
        addKindCheese({
          id: item._id,
          kind: `${item.title} less`,
          cal: item.calories / 2,
        })
      );
    }
  }
  function handleMore() {
    if (item.category === "veggies") {
      dispatch(addKindVeggies({ id: item._id, kind: `${item.title} more` }));
    }
    if (item.category === "protein") {
      dispatch(
        addKindCheese({
          id: item._id,
          kind: `${item.title} more`,
          cal: item.calories * 2,
        })
      );
    }
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
            disabled={isSelcted}
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
              variations={isSelcted?.kind.includes("less") ? "primarItem" : ""}
              size="item"
              onClick={handleLess}
            >
              Less
            </Button>
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
              size="item"
              variations={isSelcted?.kind.includes("more") ? "primarItem" : ""}
              onClick={handleMore}
            >
              more
            </Button>
          </>
        )}
      </DivB>
    </Div>
  );
}

export default Items3B;
