import { useAllProducts } from "../features/products/useAllProducts";
// import { useDispatch, useSelector } from "react-redux";
import Bread from "./Bread";
import Spinner from "./Spinner";
import Veggies from "./Veggies";
import ChesseGrilled from "./CheeseGrilled";
import styled from "styled-components";
import Proten from "./Proten";
import Sauces from "./Sauces";
import Seasonings from "./Seasonings";
import { useLocation } from "react-router-dom";
const Section = styled.section`
  display: flex;
  //border: 2px solid red;
  width: 100%;
  flex-direction: column;
  gap: 2rem;
  overflow-y: scroll;
  height: calc(100vh - 22rem);
  @media screen and (max-width: 1000px) {
    grid-column: 1/-1;
  }
`;

function ProductItem() {
  const { products, isLoading } = useAllProducts();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  if (isLoading) return <Spinner />;

  const veggies = products.filter((item) => item.category === "veggies");
  const bread = products.filter((item) => item.category === "bread");
  const chesse = products.filter((item) => item.category === "cheese");
  const sauces = products.filter((item) => item.category === "sauces");
  const seasonings = products.filter((item) => item.category === "seasonings");

  return (
    <Section>
      <Bread bread={bread} />
      <Proten />
      {lastSegment !== "avocado&cheese" && <ChesseGrilled chesse={chesse} />}
      <Veggies veggies={veggies} />
      {lastSegment !== "avocado&cheese" && <Sauces sauces={sauces} />}
      <Seasonings seasonings={seasonings} />
    </Section>
  );
}

export default ProductItem;
