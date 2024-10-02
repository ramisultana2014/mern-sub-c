import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (signupObj) => signUpApi(signupObj),
    onSuccess: (data) => {
      toast.success(`thanks for joining ,please check your email`);
      queryClient.setQueryData(["user"], data.user);
      navigate("/AccountActivation", { replace: true });
    },
    onError: (error) => {
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { signup, isLoading };
}
//data {user: {…}}
// user
// :
// createdAt
// :
// "2024-05-30T09:57:25.523Z"
// email
// :
// "carol@test.com"
// id
// :
// "66584d8541ed91a77467d118"
// isVerified
// :
// false
// name
// :
// "carol"
// role
// :
// "user"
// updatedAt
// :
// "2024-05-30T09:57:25.523Z"
// __v
// :
// 0
// _id
// :
// "66584d8541ed91a77467d118"
