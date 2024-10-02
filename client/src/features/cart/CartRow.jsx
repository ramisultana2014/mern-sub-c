import styled from "styled-components";
import Table from "./Table";
import { useDispatch } from "react-redux";
import {
  decreaseQuant,
  deleteItemInBag,
  increaseQuant,
} from "../../context/cartSlice";
const Div = styled.div`
  //height: 10rem;
  // overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  //border: 2px solid green;
  width: auto;
  gap: 0.5rem;
  @media screen and (max-width: 600px) {
    width: 70%;
  }
`;
const Div1 = styled.div`
  height: 10rem;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
  //border: 2px solid green;
  width: auto;

  @media screen and (max-width: 600px) {
    width: 70%;
  }
`;
const Span = styled.span`
  cursor: pointer;
`;
function CartRow({ sandwish }) {
  const dispatch = useDispatch();
  return (
    <>
      <Table.Row>
        <Div>{sandwish.sandwichName}</Div>
        <Div1>
          <p>{sandwish.sandwichDetails}</p>
        </Div1>
        <Div>
          <Span onClick={() => dispatch(decreaseQuant(sandwish.id))}>-</Span>
          {sandwish.sandwichQuantity}
          <Span onClick={() => dispatch(increaseQuant(sandwish.id))}>+</Span>
          <Span onClick={() => dispatch(deleteItemInBag(sandwish.id))}>❌</Span>
        </Div>
        <Div>{sandwish.sandwichTotalPrice} $</Div>
        <Div>{sandwish.sandwishCals}/each</Div>
      </Table.Row>
    </>
  );
}

export default CartRow;
