import styled from "styled-components";
import StyledLink from "../../ui/StyledLink";
import Heading from "../../ui/Heading";
import { useGetOrder } from "./useGetOrder";
import Spinner from "../../ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";

const StyledPage = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;

  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;
  & h1 {
    margin-bottom: 3.2rem;
  }
  & h2 {
    margin-bottom: 3.2rem;
  }
`;

function SearchResult() {
  const { order, isLoading } = useGetOrder();
  const queryClient = useQueryClient();
  const orderId = queryClient.getQueryData(["order"]);
  //console.log(orderId);
  if (isLoading) return <Spinner />;
  //console.log(order);
  return (
    <StyledPage>
      <Box>
        <Heading as="h1">{orderId?.orderId}</Heading>
        <Heading as="h1">{order.message}</Heading>

        <StyledLink line="line" to="/homepage">
          Continue ordering-HomePage 🏠
        </StyledLink>
      </Box>
    </StyledPage>
  );
}

export default SearchResult;
