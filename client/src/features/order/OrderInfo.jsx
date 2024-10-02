import styled from "styled-components";
import Heading from "../../ui/Heading";
import { useQueryClient } from "@tanstack/react-query";
import StyledLink from "../../ui/StyledLink";
import Map from "./Map";

const StyledPage = styled.main`
  //height: 100vh;
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
const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
`;
function OrderInfo() {
  const queryClient = useQueryClient();
  const order = queryClient.getQueryData(["order"]);
  //console.log(order);
  return (
    <Div>
      <StyledLink to="/homepage">Continue ordering-HomePage</StyledLink>
      <StyledPage>
        <Box>
          <Heading as="h1">
            have a nice meal , your orderId is {order?.orderId}
          </Heading>
          <Heading as="h2">
            please use the searchbar for remaining deleviry time
          </Heading>
          <Heading as="h2">phoneNumber : {order?.phoneNumber}</Heading>
          <Heading as="h2">address : {order?.address}</Heading>
          <Heading as="h2">
            DeleviryTime : {order?.deleviryTime} minutes
          </Heading>
        </Box>
      </StyledPage>
      {order?.position !== null && (
        <Map delivery={JSON.parse(order.position)} />
      )}
    </Div>
  );
}

export default OrderInfo;
