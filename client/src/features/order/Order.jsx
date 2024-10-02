import { useForm } from "react-hook-form";
import styled from "styled-components";
import { HiOutlineMapPin } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrder } from "./useCreateOrder";
import { clearCart } from "../../context/cartSlice";
import Button from "../../ui/Button";
import { useQueryClient } from "@tanstack/react-query";
import Review from "../../ui/Review";
import { useState } from "react";
//import { useAddress } from "../../helpers/useAddress";
const DivOrder = styled.section`
  display: flex;

  flex-direction: column;
  gap: 2rem;
  width: 100%;
  border: 2px solid var(--color-grey-100);
  padding: 1rem;

  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;
const Form = styled.form`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 3px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;

  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;
const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 10rem 20rem 20rem;
  gap: 1rem;
  position: relative;
  font-size: 1.2rem;
  padding: 1rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    gap: 1.2rem;
  }
`;

const SvgButton = styled.div`
  font-size: 3rem;
  color: var(--color-green-700);
  cursor: pointer;
  position: relative;
  &::before {
    display: block;
    position: absolute;
    content: "current location";
    opacity: 0;
    font-size: 1.2rem;
    //border: 2px solid black;
    top: 0;
    left: 0;
    width: 10rem;
    transform: translate(30%, 60%);
  }
  &:hover::before {
    opacity: 1;
  }
`;

const Input = styled.input`
  width: 20rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  padding: 1.2rem 3.2rem;
`;
const Label = styled.label`
  font-weight: 500;
  font-size: 1.4rem;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function Order() {
  const { register, formState, handleSubmit, setValue } = useForm();
  const [position, setPosition] = useState(null);
  //console.log(position);
  const [addressByLocation, setAddressByLocation] = useState("");
  // console.log(addressByLocation);
  const { errors } = formState;
  const { createOrder, isLoading } = useCreateOrder();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.bag.cart);
  //console.log(cart);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const totalP = cart?.reduce((acc, el) => acc + el.sandwichTotalPrice, 0);
  const totalSandwichQuant = cart?.reduce(
    (acc, cur) => acc + cur.sandwichQuantity,
    0
  );

  function onSubmit(data) {
    //console.log(data, cart);
    createOrder({
      orderObj: {
        ...data,
        cart,
        orderPrice: totalP,
        totalSandwichQuant,
        position: JSON.stringify(position),
      },
      email: { email: user?.email },
    });
    dispatch(clearCart());
  }
  function getPosition() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }
  async function handleLocation() {
    //e.preventDefault();
    try {
      const positionObj = await getPosition();
      //console.log(positionObj);
      const latitude = positionObj.coords.latitude;
      const longitude = positionObj.coords.longitude;
      setPosition({
        latitude,
        longitude,
      });

      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
      );
      if (!res.ok) throw Error("Failed getting address");
      const data = await res.json();
      //console.log("data", data);
      const addressLocation = `${data.city},${data.countryCode}`;
      setAddressByLocation(addressLocation);
      setValue("address", addressLocation);
    } catch (error) {
      console.error("Error getting position:", error);
    }
  }
  return (
    <DivOrder>
      <Review />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <Label htmlFor="phoneNumber">phoneNumber</Label>
          <Input
            type="tel"
            id="phoneNumber"
            {...register("phoneNumber", {
              required: "required",
              pattern: {
                value:
                  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                message: "Not Valid",
              },
            })}
            disabled={isLoading}
            placeholder="this field is required"
          />
          {errors?.phoneNumber?.message && (
            <Error>{errors.phoneNumber.message}</Error>
          )}
        </FormRow>
        <FormRow>
          <Label htmlFor="orderPrice">totalPrice</Label>
          <Input
            type="number"
            id="orderPrice"
            {...register("orderPrice")}
            disabled={true}
            defaultValue={totalP}
          />
        </FormRow>

        <FormRow>
          <Label htmlFor="address">address</Label>
          <Input
            type="text"
            id="address"
            {...register("address", {
              required: "the address field is required",
            })}
            disabled={isLoading}
            placeholder="this field is required"
            defaultValue={addressByLocation}
          />

          <SvgButton disabled={addressByLocation} onClick={handleLocation}>
            <HiOutlineMapPin />
          </SvgButton>
        </FormRow>
        {errors?.address?.message && <Error>{errors.address.message}</Error>}
        <FormRow>
          <Button disabled={isLoading} variations="primary" size="item">
            confirm
          </Button>
          <Button disabled={isLoading} type="reset" variations="cancel">
            Cancel
          </Button>
        </FormRow>
      </Form>
    </DivOrder>
  );
}

export default Order;
