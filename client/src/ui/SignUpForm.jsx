import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "./Button";
import { useSignUp } from "../features/authentication/useSignup";
import SpinnerMini from "./SpinnerMini";
const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  width: 50%;
  gap: 2rem;
`;
const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 10rem 30rem 20rem;
  column-gap: 1rem;
  font-size: 1.8rem;
  padding: 1.2rem 0;
  &:has(button) {
    display: flex;
    align-items: center;
    padding: 2rem;
    gap: 2rem;

    //justify-content: flex-start;
  }
`;
const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
`;
const Label = styled.label`
  font-weight: 500;
  //overflow-wrap: anywhere;
  overflow-wrap: break-word;
`;
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
function SignUpForm() {
  const { signup, isLoading } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  function onSubmit({ name, email, password, passwordConfirm }) {
    signup(
      { name, email, password, passwordConfirm },
      { onSettled: () => reset() }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "this field is required" })}
          disabled={isLoading}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "this field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
          disabled={isLoading}
        />
        {errors?.email?.message && <Error>{errors.email.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="password">password</Label>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "Password (min 8 characters)",
            },
          })}
          disabled={isLoading}
        />
        {errors?.password?.message && <Error>{errors.password.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="passwordConfirm">confirm password </Label>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "this field is required",
            validate: (value) =>
              value === getValues().password || "passwords need to be match",
          })}
          disabled={isLoading}
        />
        {errors?.passwordConfirm?.message && (
          <Error>{errors.passwordConfirm.message}</Error>
        )}
      </FormRow>
      <FormRow>
        <Button disabled={isLoading} variations="primary" size="meduim">
          {isLoading ? <SpinnerMini /> : "SUBMIT"}
        </Button>
        <Button
          disabled={isLoading}
          type="reset"
          size="small"
          variations="cancel"
        >
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignUpForm;
