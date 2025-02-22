import React, { useEffect } from "react";
import { userLogout } from "../../utils/auth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"


// sakht tanzimat sweetalert2
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true
})

function Logout() {
  useEffect(() => {
    userLogout();
    Toast.fire({
      icon: "warning",
      title: "Logout Successfully",
    })
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
