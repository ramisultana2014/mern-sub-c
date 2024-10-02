import styled from "styled-components";

import Heading from "../ui/Heading";

const StyledPageNotFound = styled.main`
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

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function Thanks() {
  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">
          thanks for submiting , please check your email 📫
        </Heading>
        <Heading as="h2"> you can close this page</Heading>
      </Box>
    </StyledPageNotFound>
  );
}

export default Thanks;
