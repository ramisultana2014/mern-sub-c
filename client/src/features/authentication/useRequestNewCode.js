import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { requestNewCode as requestNewCodeApi } from "../../services/apiAuth";

export function useRequestNewCode() {
  const { mutate: requestNewCode, isLoading } = useMutation({
    mutationFn: (obj) => requestNewCodeApi(obj),
    onSuccess: () => {
      toast.success("please check you email");
    },
    onError: () => {
      toast.error("please try again later");
    },
  });
  return { requestNewCode, isLoading };
}
