import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const allUserData = useAuthStore((state) => state.allUserData);
  console.log("is user logged in Home page?", isLoggedIn());
  console.log("user data in zustand store?", allUserData);
  return (
    <>
      {isLoggedIn() ? (
        <div>
          <h1>dashboard</h1>
          <Link to={"/logout"}>Log out</Link>
        </div>
      ) : (
        <div>
          <h1>dashboard</h1>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>register</Link>
        </div>
      )}
    </>
  );
}

export default Home;
