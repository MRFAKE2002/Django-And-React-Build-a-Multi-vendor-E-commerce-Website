// Libraries
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// API Function
import axiosAPIInstance from "../../utils/axios";

// Plugin
import UserData from "./UserData";

// sakht tanzimat sweetalert2
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

function UseProfileData() {
  //! Custom States

  const [profile, setProfile] = useState([]);

  //! Custom Hooks

  const userData = UserData();
  const navigate = useNavigate(); // مقدار navigate را دریافت کن

  //! useEffect

  useEffect(() => {
    if (userData?.user_id === "undefined") {
      navigate("/login", {
        state: { from: location?.pathname },
        replace: true,
      });
      return; // برای جلوگیری از ادامه اجرا
    }

    axiosAPIInstance.get(`user/profile/${userData?.user_id}/`).then((res) => {
      setProfile(res.data);
    });
  }, []);

  //! JSX

  return profile;
}

export default UseProfileData;
