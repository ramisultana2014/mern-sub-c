import styled from "styled-components";
import Items3B from "./Items3B";
import Heading from "./Heading";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ItemProten from "./ItemProten";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 80%;
`;
function Proten() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  //console.log(lastSegment);
  const queryClient = useQueryClient();
  const products = queryClient.getQueryData(["products"]);
  //console.log(products);
  const proten = products
    .filter((el) => el.category === "protein")
    .filter((el) => el.title !== "Egg")
    .filter((el) => el.title !== "Grilled Chicken");
  //console.log(proten);
  const egg = products.find((el) => el.title === "Egg");
  const bacon = products.find((el) => el.title === "Bacon");
  const grilledchicken = products.find((el) => el.title === "Grilled Chicken");

  if (lastSegment === "bacon&eggs")
    return (
      <Div>
        <Heading as="h1">Proten</Heading>
        {lastSegment === "bacon&eggs" && <ItemProten item={egg} />}
        {lastSegment === "bacon&eggs" && <ItemProten item={bacon} />}
      </Div>
    );
  if (lastSegment === "grilledchicken")
    return (
      <Div>
        <Heading as="h1">Proten</Heading>
        <ItemProten item={grilledchicken} />
      </Div>
    );
  if (lastSegment === "bmt")
    return (
      <Div>
        <Heading as="h1">Proten</Heading>
        <p>select as you want</p>
        {proten.map((item) => (
          <Items3B item={item} key={item.title} />
        ))}
      </Div>
    );
}

export default Proten;
