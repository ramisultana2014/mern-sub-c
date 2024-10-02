import Heading from "../ui/Heading";
import SignUpForm from "../ui/SignUpForm";
import StyledCont from "../ui/StyledCont";

function SignUp() {
  return (
    <StyledCont>
      <Heading as="h1">please fill up the form</Heading>
      <SignUpForm />
    </StyledCont>
  );
}

export default SignUp;
