// libraries
import { Route, Routes } from "react-router-dom";

// views images
import Login from "./views/auth/Login";
import Home from "./views/shop/Home";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
