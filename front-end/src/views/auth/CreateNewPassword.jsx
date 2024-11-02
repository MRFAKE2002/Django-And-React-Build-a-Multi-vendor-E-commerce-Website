// libraries
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosAPIInstance from "../../utils/axios";

function CreateNewPassword() {
  /*
    dar inja ma mikhaim az 'user' betunim oun 'data' ro ke az 'link' dakhel 'email' ke barash ferestadim begirim va 
    ba estefade az 'useSearchParams' mitunim 'data' ro begirim va mitunim ba estefade az 'FormData' biaim 'object'
    besazim va behesh 'name va value' bedim va oun 'object' ro be 'url' ke mikhaim 'post' konim va dar 'back-end'
    'data' ro begirim va bebinim kodum 'user' mikhad 'password avaz kone' va oun 'password' ro barash set konim.
  */

  const [searchParams] = useSearchParams()

  const userOtp = searchParams.get("otp")
  const userUidb64 = searchParams.get("uidb64")

  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  })

  const navigate = useNavigate()

  const handelOnChangeInput = (event) => (
    setNewPassword((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value
    }))
  )

  const handelSubmitForm = async (event) => {
    event.preventDefault()

    if (newPassword.password !== newPassword.confirmPassword) {
      alert("Password does not match!")
    } else {
      /* 
        inja ma miaim ba estefade az 'FormData' miaim yek 'object' misazim ke behesh 'name va value' midim va 
        in 'object' ro midim be 'back-end'
      */
      const userFormData = new FormData()

      userFormData.append("otp", userOtp)
      userFormData.append("uidb64", userUidb64)
      userFormData.append("password", newPassword.password)

      try {
        /* 
          inja miaim be 'API call' mikonim va 'data user' ro be 'url' ke dar 'back-end' gharar 'data' ro begire va 
          bebine kodum 'user request dade' va biad 'password' jadid barash 'set' kone.
        */
        await axiosAPIInstance.post("password-change/", userFormData).then((response) => {
          alert("Password changed successfully.")
          navigate("/login")
        })
      } catch (error) {
        alert("An error occurred while trying to change the password!")
      }
    }}

  return (
    <div>
      <h1>Create Password</h1>
      <form onSubmit={handelSubmitForm}>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your new password"
        />
        <br />
        <br />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password"
        />
        <br />
        <br />
        <button type="submit">Save New Password</button>
      </form>
    </div>
  );
}

export default CreateNewPassword;
