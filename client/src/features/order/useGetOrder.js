import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrder as getOrderApi } from "../../services/apiOrder";
import { useSearchParams } from "react-router-dom";
export function useGetOrder() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  //console.log("user", user);
  const email = { email: user?.email };
  //console.log("email in use", email);
  const orderId = { id };
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderApi({ email, orderId }),
  });
  return { order, isLoading };
}
