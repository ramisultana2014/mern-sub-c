import { useQueryClient } from "@tanstack/react-query";
import NotAuth from "./NotAuth";

function ProtectedRoutes({ children }) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  if (!user?.email) return <NotAuth />;
  return children;
}

export default ProtectedRoutes;
