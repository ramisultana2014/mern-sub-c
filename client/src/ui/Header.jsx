import styled from "styled-components";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiMiniPower } from "react-icons/hi2";
import SearchOrder from "./SearchOrder";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
const Headerlayout = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;
  padding: 0 3rem;
`;
const ButtonIcon = styled.button`
  border: none;
  background: none;
  padding: 0.6rem;
  border-radius: 6px;
  transition: all 0.5s;
  position: relative;

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-green-700);
  }
  & svg:hover {
    color: var(--color-grey-800);
  }
`;

function Header() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const cart = useSelector((state) => state?.bag?.cart);
  //console.log(cart);
  function handleLogout() {
    navigate("/login", { replace: true });
    queryClient.setQueriesData(["user"], null);
  }
  return (
    <Headerlayout>
      <SearchOrder />
      <ButtonIcon onClick={() => navigate("/homepage/cart")}>
        {cart?.length === 0 ? <HiOutlineShoppingBag /> : <HiMiniShoppingBag />}
        {cart?.length ? cart.length : ""}
      </ButtonIcon>
      <ButtonIcon>
        <HiMiniPower onClick={handleLogout} />
      </ButtonIcon>
    </Headerlayout>
  );
}

export default Header;
