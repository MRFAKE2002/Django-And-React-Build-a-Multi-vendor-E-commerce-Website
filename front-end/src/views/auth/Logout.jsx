import React, { useEffect } from "react";
import { userLogout } from "../../utils/auth";
import { Link } from "react-router-dom";

function Logout() {
  useEffect(() => {
    userLogout();
  }, []);

  return (
    <>
      <h1>dashboard</h1>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>register</Link>
    </>
  );
}

export default Logout;
