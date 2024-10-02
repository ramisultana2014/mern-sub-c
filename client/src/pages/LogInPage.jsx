import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import LogInForm from "../ui/LogInForm";
import FlexDiv from "../ui/FlexDiv";
import StyledLink from "../ui/StyledLink";
import StyledCont from "../ui/StyledCont";
const StyledDivBack = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 10rem;
`;
const StyledSpan = styled.span`
  color: var(--color-green-700);
`;

function LogInPage() {
  return (
    <>
      <StyledDivBack>
        <Logo>Welcome to SUB-C</Logo>
        <StyledLink to="/start">
          <span>←</span>
          <span>BACK</span>
        </StyledLink>
      </StyledDivBack>
      <StyledCont>
        <Heading as="h1">
          Sign In To Your <StyledSpan>Sub-c </StyledSpan> Account
        </Heading>
        <LogInForm />
        <FlexDiv>
          Don't have an account ?
          <StyledLink line="line" to="/signup">
            join Now
          </StyledLink>
        </FlexDiv>
        <StyledLink line="line" to="/forgetpassword">
          Forgot your password?
        </StyledLink>
      </StyledCont>
    </>
  );
}

export default LogInPage;
