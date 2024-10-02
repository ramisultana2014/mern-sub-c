import { useState } from "react";
import styled from "styled-components";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useNavigate, useSearchParams } from "react-router-dom";
const Div = styled.div`
  position: relative;
  width: 2rem; /* Initial container width */
  height: 8rem;
  transition: width 0.3s;
  &:focus-within {
    width: 20rem; /* Container width when input is focused */
  }
`;
const Input = styled.input`
  border: 1px solid var(--color-green-700);

  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.3rem 1.2rem;
  width: 2rem;
  transition: width 1s;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  &:focus {
    width: 100%;
    color: var(--color-green-700);
    outline: none;
  }
`;
const Icon = styled.div`
  transition: all 0.5s;
  position: absolute;
  top: 2.6rem;
  right: 3rem;

  & svg {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-grey-800);
  }
  & svg:hover {
    color: var(--color-green-700);
  }
`;
function SearchOrder() {
  const [order, setorder] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!order) return;
    searchParams.set("id", order);
    setSearchParams(searchParams);
    setorder("");
    navigate(`/homepage/searchresult?id=${order}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <Div>
        <Icon>
          <HiMiniMagnifyingGlass />
        </Icon>
        <Input
          value={order}
          onChange={(e) => setorder(e.target.value)}
          placeholder="   search order"
          type="text"
          maxLength="6"
        />
      </Div>
    </form>
  );
}

export default SearchOrder;
