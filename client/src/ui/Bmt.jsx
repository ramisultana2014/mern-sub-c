import styled from "styled-components";
import ProductItem from "./ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addToBag, clearSandwich } from "../context/cartSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: grid;
  row-gap: 2rem;
  padding: 0 4rem;
  grid-template-columns: 1fr 50rem;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const Img = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  //border: 2px solid green;
  align-self: center;
  justify-self: center;
  @media screen and (max-width: 1100px) {
    display: none;
  }
`;
const SanFooterDetail = styled.footer`
  border: 2px solid var(--color-grey-300);
  padding: 2rem;
  height: 10rem;
  background-color: var(--color-grey-50);
  grid-column: 1/-1;
  display: flex;
  //justify-content: space-between;
  gap: 1rem;
  box-shadow: var(--shadow-lg);
  overflow-y: scroll;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
`;
const QuantDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid green;
  padding: 2rem 1rem;
  gap: 1rem;

  &:hover {
    border: 1px solid var(--color-grey-300);
  }
  @media screen and (max-width: 500px) {
    width: 10rem;
    padding: 1rem;
    font-size: 1.4rem;
  }
`;
const FooterP = styled.p`
  text-align: center;
`;
const DivP = styled.div`
  width: 50%;
`;
const Bfooter = styled.button`
  background-color: green;
  color: #fff;
  border: none;
  padding: 1rem 3rem;
  border-radius: 8px;
  transition: all 1s;
  &:hover {
    background-color: var(--color-green-100);
    color: black;
  }
  @media screen and (max-width: 600px) {
    padding: 1rem;
    font-size: 1.4rem;
  }
`;
const Bclear = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  font-size: 1.6rem;
  color: green;
  transition: all 1s;
  &:hover {
    text-decoration: none;
    color: red;
  }
`;
const BQuant = styled.button`
  background: none;
  font-size: 2rem;
  border: none;
  &:hover {
    color: green;
  }
`;
function Bmt() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [price] = useState(20);
  const navigate = useNavigate();
  const sandwish = useSelector((state) => state?.bag?.sandwish);
  //console.log(sandwish);
  const sandwishDetails = sandwish?.map((el) => el.kind).join(",");
  const sandwishCals = sandwish?.reduce((acc, cur) => acc + cur.cal, 0);
  function handleAddToCart() {
    const sandwish1 = {
      id: Math.floor(10000 + Math.random() * 9000),
      sandwichName: "bmt",
      sandwichDetails: sandwishDetails,
      sandwichQuantity: quantity,
      sandwishCals,
      sandwichPrice: 20,
      sandwichTotalPrice: 20 * quantity,
    };
    dispatch(addToBag(sandwish1));
    navigate("/homepage");
  }
  useEffect(() => {
    dispatch(clearSandwich());
  }, [dispatch]);
  return (
    <Container>
      <ProductItem />
      <Img src="/img/0.jpg" alt="bmt" />

      <SanFooterDetail>
        <FooterP>{sandwishCals} cals/EACH</FooterP>
        <DivP>
          <FooterP>{sandwishDetails}</FooterP>
        </DivP>
        <Bclear
          onClick={() => dispatch(clearSandwich())}
          disabled={sandwish.length === 0}
        >
          Clear all
        </Bclear>
        <QuantDiv>
          <BQuant
            onClick={() => setQuantity((q) => (q === 1 ? 1 : q - 1))}
            disabled={sandwish.length === 0}
          >
            -
          </BQuant>
          <p>{quantity}</p>
          <BQuant
            onClick={() => setQuantity((q) => q + 1)}
            disabled={sandwish.length === 0}
          >
            +
          </BQuant>
        </QuantDiv>

        <Bfooter onClick={handleAddToCart} disabled={sandwish.length === 0}>
          Add to bag , {price * quantity} $
        </Bfooter>
      </SanFooterDetail>
    </Container>
  );
}

export default Bmt;
