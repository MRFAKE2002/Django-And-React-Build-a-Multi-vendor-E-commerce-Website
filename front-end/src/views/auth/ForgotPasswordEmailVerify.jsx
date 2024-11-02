// libraries
import React, { useState } from 'react'

// API call Instance
import axiosAPIInstance from '../../utils/axios'

function ForgotPasswordEmailVerify() {
  const [email, setEmail] = useState("")

  const handelOnChange = (event) => {
    setEmail(event.target.value)
  }

  const handelOnclick = (event) => {
    try {
      axiosAPIInstance.get(`password-reset/${email}/`).then((response) => {
        console.log(response);
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h1>Forgot password email verification</h1>
      <input type="email" name="email" onChange={handelOnChange} />
      <button type="submit" onClick={handelOnclick}>submit</button>
    </>
  )
}

export default ForgotPasswordEmailVerify
