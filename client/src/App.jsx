import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
//import StartPage1 from "./pages/StartPage1";
import LogInPage from "./pages/LogInPage";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import AccountActivationPage from "./pages/AccountActivationPage";
import ForgetPassword from "./pages/ForgetPassword";
import Thanks from "./pages/Thanks";
import PageNotFound from "./ui/PageNotFound";
import ResetPassword from "./pages/ResetPassword";
//import ProductItem from "./pages/ProductItem";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import AppLayout from "./ui/AppLayout";
import Bmt from "./ui/Bmt";
import BaconAndEggs from "./ui/BaconAndEggs";
import Avocado from "./ui/Avocado";
import Cart from "./pages/Cart";
import ChickenGrilled from "./ui/ChickenGrilled";
import Order from "./features/order/Order";
import OrderInfo from "./features/order/OrderInfo";
import SearchResult from "./features/order/SearchResult";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 1000 * 60 * 30,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* when writing like under we dirctly go to /start not to / like in open cinema */}
          <Route index element={<Navigate replace to="start" />} />
          <Route path="start" element={<StartPage />} />
          <Route path="login" element={<LogInPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate replace to="homepage" />} />
            <Route path="homepage" element={<Homepage />} />

            <Route
              path="homepage/grilledchicken"
              element={<ChickenGrilled />}
            />
            <Route path="homepage/bmt" element={<Bmt />} />
            <Route path="homepage/bacon&eggs" element={<BaconAndEggs />} />
            <Route path="homepage/avocado&cheese" element={<Avocado />} />
            <Route path="homepage/cart" element={<Cart />} />
            <Route path="homepage/order" element={<Order />} />
            <Route path="homepage/orderInfo" element={<OrderInfo />} />
            <Route path="homepage/searchresult" element={<SearchResult />} />
          </Route>
          {/* <Route path="homepage" element={<Homepage />} />
          <Route path="homepage/:productitem" element={<ProductItem />} /> */}

          <Route path="accountactivation" element={<AccountActivationPage />} />
          <Route path="forgetpassword" element={<ForgetPassword />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="thanks" element={<Thanks />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12} // space between window and toaster
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
