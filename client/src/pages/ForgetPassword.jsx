import styled from "styled-components";
import Heading from "../ui/Heading";
import { useState } from "react";
import Button from "../ui/Button";
import { useForgetPassword } from "../features/authentication/useForgetPassword";
const Div = styled.div`
  height: calc(100vh - 5rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  width: 20%;
  gap: 2rem;
`;
const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  width: 100%;
  position: relative;
  &::placeholder {
    position: absolute;
    top: 30%;
  }
`;
function ForgetPassword() {
  const [email, setemail] = useState("");
  const { forgetPassword, isLoading } = useForgetPassword();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    forgetPassword({ email });
    setemail("");
  }
  return (
    <Div>
      <Form onSubmit={handleSubmit}>
        <Heading as="h1">please put your email</Heading>
        <Input
          type="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <Button size="login" variations="primary" disabled={isLoading}>
          submit
        </Button>
      </Form>
    </Div>
  );
}

export default ForgetPassword;
