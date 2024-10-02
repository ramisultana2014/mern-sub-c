import { useSelector } from "react-redux";
import Table from "../features/cart/Table";
import CartRow from "../features/cart/CartRow";
import styled from "styled-components";
import StyledLink from "../ui/StyledLink";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Div = styled.div`
  height: 10rem;
  //overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  //border: 2px solid green;
  width: 100%;
  /* @media screen and (max-width: 600px) {
    width: 70%;
  } */
  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
  }
`;
function Cart() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.bag.cart);
  //console.log("cart", cart);
  return (
    <Container>
      <StyledLink line="line" to="/homepage">
        <span>Add More</span>
      </StyledLink>
      <Table cols="1fr 2fr 0.5fr 1fr 1fr">
        <Table.Header>
          <Div>name</Div>
          <Div>Details</Div>
          <Div>Quant</Div>
          <Div>total</Div>
          <Div>cals</Div>
        </Table.Header>

        <Table.Body
          data={cart}
          render={(item) => <CartRow key={item.id} sandwish={item} />}
        />
      </Table>
      <Button
        size="item"
        variations="primarItem"
        onClick={() => navigate("/homepage/order")}
        disabled={cart.length === 0}
      >
        Continue to Order
      </Button>
    </Container>
  );
}
export default Cart;
