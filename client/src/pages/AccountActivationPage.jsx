import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import SpinnerMini from "../ui/SpinnerMini";
import Button from "../ui/Button";
import { useAccountActivate } from "../features/authentication/useAccountActivate";
import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import { useRequestNewCode } from "../features/authentication/useRequestNewCode";
const Div = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
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
const Act = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  color: var(--color-green-700);
  &:hover {
    text-decoration: none;
  }
`;
function AccountActivationPage() {
  const [verificationCode, setverificationCode] = useState("");
  const { accountActivate, isLoading } = useAccountActivate();
  const { requestNewCode } = useRequestNewCode();
  const [showtimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(0);
  const queryClient = useQueryClient(); // Get the query client

  const user = queryClient.getQueryData(["user"]);
  //console.log(user);
  function handleSubmit(e) {
    e.preventDefault();
    if (!verificationCode) return;
    const obj = {
      email: user?.email,
      verificationCode,
    };
    accountActivate(obj);
    setverificationCode("");
  }
  function handleNewCode() {
    setShowTimer((s) => !s);
    setTimer(30);
    requestNewCode({ name: user?.name, email: user?.email });
  }
  useEffect(
    function () {
      if (showtimer && timer > 0) {
        const interValid = setInterval(() => {
          setTimer((timer) => timer - 1);
        }, 1000);
        return () => clearInterval(interValid);
      } else if (timer === 0) {
        setShowTimer(false);
      }
    },
    [timer, showtimer]
  );
  return (
    <Div>
      <Heading as="h1">please Enter your Vervication Code </Heading>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="* * * * "
          onChange={(e) => setverificationCode(e.target.value)}
          value={verificationCode}
        />

        <Button disabled={isLoading} variations="primary" size="small">
          {isLoading ? <SpinnerMini /> : "SUBMIT"}
        </Button>
      </Form>
      <Heading as="h2">
        if you did't recieve your code
        <Act onClick={handleNewCode} disabled={showtimer}>
          {showtimer
            ? `you can ask for new code after ${timer} s`
            : "click here"}
        </Act>
      </Heading>
    </Div>
  );
}

export default AccountActivationPage;
