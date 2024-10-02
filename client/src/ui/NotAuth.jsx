import styled from "styled-components";

import Heading from "./Heading";

import StyledLink from "./StyledLink";

const StyledPageNotFound = styled.main`
  height: 50vh;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  //background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  //flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function NotAuth() {
  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">Please Signup or Login</Heading>
      </Box>
      <StyledLink line="line" to="/login">
        {" "}
        👉🏻 Click here
      </StyledLink>
    </StyledPageNotFound>
  );
}

export default NotAuth;
