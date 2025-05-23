// libraries
import React from "react";
// in 'library' baraye modiriat 'cookie browser' mesl 'get set delete'  estefade mishe.
import Cookies from "js-cookie";
// in 'library' baraye 'tajziye ya decode' kardan 'JWT token' ke shamel 'data ramz gozari shode' ast estefade mishe.
import { jwtDecode } from "jwt-decode";

function UserData() {
  // Retrieve the access token and refresh token from browser cookies and if there isn't it returns undefined.
  let accessToken = Cookies.get("access_token");
  let refreshToken = Cookies.get("refresh_token");
  // console.log(accessToken);
  // console.log(refreshToken);



  if (accessToken && refreshToken && refreshToken != 'undefined') {
    
    // Both access and refresh tokens exist
    // Decode the refresh token to extract user information
    const token = refreshToken;

    // inja 'data user' ro az 'token' migire va 'decode' mikone va 'object data' return mikone.
    const decoded = jwtDecode(token);
    // console.log(decoded);

    

    /*
      console.log(decoded);
      {
        '
        email: "roozbehbadalis@gmail.com"
        exp: 1738182920
        fullname: "roozbehbadalis"
        iat: 1738096520
        jti: "3352a2bbff8249199608413e694d1eac"
        phone: null
        token_type: "refresh"
        user_id: 1
        username: "roozbeh"
        vendor_id: 0
        '
      }
    */

    // Return the decoded user data, which may include user information
    return decoded;
  } else {
    // One or both tokens (access or refresh) are missing
    // This block handles the case when either token is not present in the cookies.
    // You may want to perform error handling or redirection here
    // if access or refresh tokens are not available, based on your application's requirements.
    // For instance, you can uncomment the following lines to log a message:
    // console.log("Access token or refresh token is missing.");
    // Depending on your application, you might want to display a login form
    // or redirect the user to a login page if the tokens are missing.
    // This function is expected to return `undefined` if tokens are missing.
    // Handle the missing tokens as needed based on your application's logic.
  }
}

export default UserData;

/*
  cookie 4 method dare:
  1. Cookies.set(key, value, options) //! mitunim baraye zakhire oun meghdar dakhel cookie tanzimat bezarim.
  2. Cookies.get(key)  //! oun meghdar az cookie ro ke mikhaim behemun mide.
  3. Cookies.get()  //! tamame maghadir ro be surat object mide.
  4. Cookies.remove(key, options)  //! mitunim baraye oun meghdar ke mikhaim pak konim masir moshakhas konim vali bayad mesl zaman set bashe.
*/
