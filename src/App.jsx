import "./App.css";
import React, { useState } from "react";
import { store, persistor } from "./redux/Store";
import { Provider } from "react-redux";
import NavComponent from "./components/NavComponent";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import {
  Routes,
  BrowserRouter,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import MyOrderPage from "./pages/MyOrderPage";
import Payment from "./pages/Payment";
import { PersistGate } from "redux-persist/integration/react";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

function AppRouter() {
  const location = useLocation();

  const { loginSuccess } = store.getState().users;
  const protectedRoutes = ["/", "/cart", "my_orders"];
  const showLayout = location.pathname.includes(protectedRoutes);
  return (
    <>
      {showLayout && <NavComponent />}
      <Routes>
        <Route path="/payment" element={<Payment />} />
        <Route
          path="/"
          element={loginSuccess ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={loginSuccess ? <CartPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/my_orders" element={<MyOrderPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
