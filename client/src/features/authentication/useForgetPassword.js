import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { forgetPassword as forgetPasswordApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
export function useForgetPassword() {
  const navigate = useNavigate();
  const { mutate: forgetPassword, isLoading } = useMutation({
    mutationFn: (obj) => forgetPasswordApi(obj),
    onSuccess: () => {
      toast.success("success");
      navigate("/thanks", { replace: true });
    },
    onError: () => {
      toast.error("please try again later");
    },
  });
  return { forgetPassword, isLoading };
}
