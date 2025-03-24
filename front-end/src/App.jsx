// libraries
import { Route, Routes } from "react-router-dom";

// views pages
import Home from "./views/shop/Home";

// auth
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Logout from "./views/auth/Logout";
import ForgotPasswordEmailVerify from "./views/auth/ForgotPasswordEmailVerify";
import CreateNewPassword from "./views/auth/CreateNewPassword";

// store
import Product from "./views/store/Product";
import ProductDetail from "./views/store/ProductDetail";
import Cart from "./views/store/Cart";
import Checkout from "./views/store/Checkout";

// Base components
import Navbar from "./views/base/Navbar";
import Footer from "./views/base/Footer";

// layouts
import MainWrapper from "./layout/MainWrapper";
import PaymentSuccess from "./views/store/PaymentSuccess";

function App() {
  return (
    <>
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
        </Routes>
        <Footer />
      </MainWrapper>
    </>
  );
}

export default App;
