import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword as resetPasswordApi } from "../../services/apiAuth";
export function useResetPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: (obj) => resetPasswordApi(obj),
    onSuccess: (data) => {
      //console.log(data);
      toast.success(`welcome back ${data.user.name}`);
      queryClient.setQueryData(["user"], data.user);
      navigate("/homepage", { replace: true });
    },
    onError: (err) => {
      //console.log(err);
      toast.error(err.message);
    },
  });
  return { resetPassword, isLoading };
}
