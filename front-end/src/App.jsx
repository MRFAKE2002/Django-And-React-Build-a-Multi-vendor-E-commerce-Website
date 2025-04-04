// Libraries
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// Views Pages
import Home from "./views/shop/Home";

// Auth
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Logout from "./views/auth/Logout";
import ForgotPasswordEmailVerify from "./views/auth/ForgotPasswordEmailVerify";
import CreateNewPassword from "./views/auth/CreateNewPassword";

// Store
import Product from "./views/store/Product";
import ProductDetail from "./views/store/ProductDetail";
import Cart from "./views/store/Cart";
import Checkout from "./views/store/Checkout";
import PaymentSuccess from "./views/store/PaymentSuccess";
import Search from "./views/store/Search";

// Customer
import Account from "./views/customer/Account";
import Orders from "./views/customer/Orders";
import OrderDetail from "./views/customer/OrderDetail";
import Invoice from "./views/store/Invoice";
import Wishlist from "./views/customer/Wishlist";
import Notifications from "./views/customer/Notifications";
import Settings from "./views/customer/Settings";

// Base Components
import Navbar from "./views/base/Navbar";
import Footer from "./views/base/Footer";

// Layouts
import MainWrapper from "./layout/MainWrapper";
import PrivateRoute from "./layout/PrivateRoute";

// Plugins
import { CartContext } from "./views/plugin/CartContext";
import UserData from "./views/plugin/UserData";
import CartID from "./views/plugin/CartID";

// API Function
import axiosAPIInstance from "./utils/axios";

function App() {
  //! Custom States

  const [cartCount, setCartCount] = useState(0);

  //! Custom Hooks

  const cart_id = CartID();

  const userData = UserData();

  //! useEffect

  useEffect(() => {
    const url = userData
      ? `cart-list/${cart_id}/${userData?.user_id}/`
      : `cart-list/${cart_id}/`;

    axiosAPIInstance.get(url).then((response) => {
      // console.log(response.data);
      setCartCount(response.data.length);
    });
  }, []);

  //! JSX

  return (
    <CartContext.Provider value={[cartCount, setCartCount]}>
      <MainWrapper>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Home />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/password-reset"
            element={<ForgotPasswordEmailVerify />}
          />
          <Route path="/create-new-password" element={<CreateNewPassword />} />

          {/* Store Routes */}
          <Route path="/" element={<Product />} />
          <Route path="/detail/:slug/" element={<ProductDetail />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/checkout/:order_oid/" element={<Checkout />} />
          <Route
            path="/payment-success/:order_oid/"
            element={<PaymentSuccess />}
          />
          <Route path="/search" element={<Search />} />

          {/* Customer Routes */}
          <Route
            path="/customer/account/"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/orders/"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/order/detail/:order_oid/"
            element={
              <PrivateRoute>
                <OrderDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/order/invoice/:order_oid/"
            element={
              <PrivateRoute>
                <Invoice />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/wishlist/"
            element={
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/notifications/"
            element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/settings/"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </MainWrapper>
    </CartContext.Provider>
  );
}

export default App;
