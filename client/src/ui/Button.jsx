import styled, { css } from "styled-components";
const Button = styled.button`
  border: none;
  display: block;

  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 1.2rem;
      padding: 0.4rem 0.8rem;
      text-transform: uppercase;
      font-weight: 600;
      text-align: center;
    `}
  ${(props) =>
    props.size === "meduim" &&
    css`
      font-size: 2rem;
      padding: 2rem 2rem;
      font-weight: 500;
      text-transform: uppercase;
    `}
    ${(props) =>
    props.size === "item" &&
    css`
      font-size: 1.6rem;
      padding: 0.5rem 3.6rem;
      font-weight: 500;
      text-transform: uppercase;
      @media screen and (max-width: 600px) {
        padding: 1rem;
        font-size: 1.4rem;
      }
    `}
    ${(props) =>
    props.size === "login" &&
    css`
      font-size: 1.6rem;
      padding: 1rem 2.4rem;
      font-weight: 500;
      text-transform: uppercase;
      width: 100%;
    `}
    ${(props) =>
    props.variations === "primary" &&
    css`
      color: var(--color-brand-50);
      background-color: var(--color-green-700);
    `}
    &:hover {
    background-color: var(--color-green-100);
    color: var(--color-grey-800);
    outline: 1px solid var(--color-green-700);
    transition: all 0.5s;
  }

  ${(props) =>
    props.variations === "primarItem" &&
    css`
      color: var(--color-brand-50);
      background-color: var(--color-green-700);
    `}

  ${(props) =>
    props.variations === "cancel" &&
    css`
      background: none;
      font-size: 1.7rem;
    `}
    ${(props) =>
    props.kind === "remove" &&
    css`
      position: absolute;
      top: 9%;
      right: 4%;
      background-color:#fff ;
      &:hover{
        color: red;
        background-color:#fff ;
        border-radius: 8px;

    `}
`;
export default Button;
