import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "../../services/apiOrder";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useCreateOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createOrder, isLoading } = useMutation({
    mutationFn: ({ orderObj, email }) => createOrderApi({ orderObj, email }),
    onSuccess: (data) => {
      // console.log("use", data.order);
      toast.success(`order successfully created`);
      queryClient.setQueryData(["order"], data.order);
      navigate("/homepage/orderInfo", { replace: true });
    },
    onError: (error) => {
      //console.log(error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { createOrder, isLoading };
}
