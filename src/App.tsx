import React, { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CartContextProvider } from "./context/CartContext";
import Cart from "./pages/cart";
import Orders from "./pages/orders";

const Home = lazy(() => import("./pages/home"));
const RestaurantMenu = lazy(() => import("./pages/RestaurantMenu"));

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/restaurant/:id"
              element={
                <Suspense>
                  <RestaurantMenu />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense>
                  <ProtectedRoute component={Cart} />
                </Suspense>
              }
            />
            <Route
              path="/orders"
              element={
                <Suspense>
                  <ProtectedRoute component={Orders} />
                </Suspense>
              }
            />
          </Routes>
        </CartContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
