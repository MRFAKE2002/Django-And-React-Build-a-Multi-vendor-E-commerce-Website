// libraries
import { Route, Routes } from "react-router-dom";

// views pages
import Login from "./views/auth/Login";
import Home from "./views/shop/Home";
import Register from "./views/auth/Register";
import Logout from "./views/auth/logout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
