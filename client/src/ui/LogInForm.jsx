import { useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "./Button";
import { useLogin } from "../features/authentication/useLogin";
import SpinnerMini from "./SpinnerMini";
const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  width: 30%;
  row-gap: 2rem;
  position: relative;
`;
const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  &::placeholder {
    //text-align: center;
  }
`;
const Icon = styled.button`
  color: none;
  font-size: 2rem;
  background: none;
  border: none;
  position: absolute;
  right: 10%;
  top: 44%;
  &:focus {
    outline: none;
  }
  @media screen and (min-width: 400px) and (max-width: 600px) {
    right: 3%;
    top: 44%;
  }
  @media screen and (max-width: 390px) {
    right: -40%;
    top: 44%;
  }
`;
function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const { login, isLoading } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    const logInObj = {
      email,
      password,
    };
    login(logInObj);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Icon type="button" onClick={() => setShowPassword((s) => !s)}>
        {showpassword ? <FaEyeSlash /> : <FaEye />}
      </Icon>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email address"
        type="email"
        disabled={isLoading}
        name="email"
        autoComplete="true"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type={showpassword ? "text" : "password"}
        disabled={isLoading}
        name="password"
      />
      <Button size="login" variations="primary">
        {isLoading ? <SpinnerMini /> : "LOGIN"}
      </Button>
    </Form>
  );
}

export default LogInForm;
