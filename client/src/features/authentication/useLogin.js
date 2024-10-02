import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: (loginObj) => loginApi(loginObj),
    onSuccess: (data) => {
      //console.log(data.data);
      toast.success(`welcome back ${data.name} `);
      queryClient.setQueryData(["user"], data);
      navigate("/homepage", { replace: true });
    },
    onError: (err) => {
      toast.error("Provided email or password are inccorrect");
    },
  });
  return { login, isLoading };
}
