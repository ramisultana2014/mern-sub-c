import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { HiOutlineStar } from "react-icons/hi2";

import { HiStar } from "react-icons/hi2";
import styled from "styled-components";
import { useCreateReview } from "../features/order/useCreateReview";
const DivReview = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2.4rem 4rem;
  gap: 1rem;
  width: 90%;

  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;
const Span = styled.span`
  color: green;
  font-size: 2.5rem;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;
const ButtonS = styled.button`
  display: flex;
  justify-content: left;
  width: 17%;
  border: none;
  background: none;
  transition: all 1s;
  &:hover {
    color: var(--color-green-700);
  }
`;

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  width: 50%;
  &::placeholder {
    //text-align: center;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;
function Review() {
  const [star, setstar] = useState(0);
  const [select, setselect] = useState(0);
  const [review, setreview] = useState("");
  const [send, setSend] = useState("send");
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const { createReview, isLoading } = useCreateReview();
  const array = [0, 1, 2, 3, 4];
  function handleReview(e) {
    e.preventDefault();
    if (!review || !select) return;
    createReview(
      { reviewObj: { review, rating: select }, email: { email: user?.email } },
      {
        onSettled: () => {
          setSend("thanks");
        },
      }
    );
  }
  return (
    <DivReview>
      <p>would you gave us your review [optional]</p>
      <Input
        type="text"
        maxLength="20"
        minLength="5"
        placeholder="max 20 caracters"
        value={review}
        onChange={(e) => setreview(e.target.value)}
        disabled={isLoading || send === "thanks"}
      />

      <Div disabled={send === "thanks"}>
        {array.map((el) => (
          <div
            key={el}
            onMouseEnter={() => setstar(el + 1)}
            onMouseLeave={() => setstar(0)}
            onClick={() => setselect(el + 1)}
          >
            <Span>
              {select ? (
                select > el ? (
                  <HiStar />
                ) : (
                  <HiOutlineStar />
                )
              ) : star > el ? (
                <HiStar />
              ) : (
                <HiOutlineStar />
              )}
            </Span>
          </div>
        ))}
        <span>{select > 0 ? select : ""}</span>
      </Div>
      <ButtonS size="small" onClick={handleReview} disabled={send === "thanks"}>
        <span>{send}</span>
      </ButtonS>
    </DivReview>
  );
}

export default Review;
