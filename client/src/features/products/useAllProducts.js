import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProduct } from "../../services/apiProduct";

export function useAllProducts() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const email = { email: user?.email };
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProduct(email),
  });
  //console.log(products);
  return { products, isLoading };
}
