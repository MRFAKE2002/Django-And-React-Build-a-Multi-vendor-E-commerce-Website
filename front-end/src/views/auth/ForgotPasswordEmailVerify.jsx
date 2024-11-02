// libraries
import React, { useState } from 'react'

// API call Instance
import axiosAPIInstance from '../../utils/axios'

function ForgotPasswordEmailVerify() {
  /*
    alan inja ma gharar ke vaghti 'user' oumad 'email' khodesh ro vared kard samt 'back-end' dakhel 
    'app userauths views ForgotPassword' biad 'check' kone age in 'user' vojud dasht biad behesh 'email' bede
    ke dakhel oun 'email link' vojud dare ke dakhelesh 'otp va uidb64 user' vojud dare ke ba raftan be oun 'link'
    mitune 'password' khodesh ro avaz kone va ma ham mitunim ba estefade az 'data' dakhel oun 'link' befahmim kodum 
    'user' oumade 'password' avaz kone va oun 'data' ro befrestim be 'back-end'.
  */
  const [email, setEmail] = useState("")

  const handelOnChange = (event) => {
    setEmail(event.target.value)
  }

  const handelOnclick = async (event) => {
    try {
      // alan inja ma darim oun 'email' ro mifrestim be 'back-end' ta be 'user otp' bedim va befrestim 
      // baraye 'change password'.
      await axiosAPIInstance.get(`password-reset/${email}/`).then((response) => {
        alert("An Email Has Been Sent To You.")
      })
    } catch (error) {
      alert("Email Does Not Exist!")
    }
  }
  return (
    <>
      <h1>Forgot password email verification</h1>
      <input type="email" name="email" onChange={handelOnChange} />
      <br/><br/>
      <button type="submit" onClick={handelOnclick}>submit</button>
    </>
  )
}

export default ForgotPasswordEmailVerify
