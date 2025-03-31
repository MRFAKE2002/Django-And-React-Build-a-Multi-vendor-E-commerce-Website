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

// Base Components
import Navbar from "./views/base/Navbar";
import Footer from "./views/base/Footer";

// Layouts
import MainWrapper from "./layout/MainWrapper";

// Plugins
import { CartContext } from "./views/plugin/CartContext";
import UserData from "./views/plugin/UserData";
import CartID from "./views/plugin/CartID";
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
    })
    
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
        </Routes>
        <Footer />
      </MainWrapper>
    </CartContext.Provider>
  );
}

export default App;
