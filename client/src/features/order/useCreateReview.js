import { useMutation } from "@tanstack/react-query";
import { createReview as createReviewApi } from "../../services/apiReview";
export function useCreateReview() {
  const { mutate: createReview, isLoading } = useMutation({
    mutationFn: ({ reviewObj, email }) => createReviewApi({ reviewObj, email }),
  });
  return { createReview, isLoading };
}
