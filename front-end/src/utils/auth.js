// baraye modiriat ehraz hoviat 'user login register' estefade mishe.
import { useAuthStore } from "../store/authStore";

// Importing the axios library for making HTTP requests
import axiosAPIInstance from "./axios";

// az in estefade mikonim ta 'data' dakhel 'token' mesl 'fullname, email, phone, password, ...' daryaft konim.
import { jwtDecode } from "jwt-decode";

// Importing the Cookies library to handle browser cookies
import Cookies from "js-cookie";

// Function to handle user registration
export const registerUser = async (
  full_name,
  email,
  phone,
  password,
  password2
) => {
  try {
    // Making a POST request to register a new user
    const { data } = await axiosAPIInstance.post("user/register/", {
      full_name,
      email,
      phone,
      password,
      password2,
    });

    // Logging in the newly registered user and displaying success toast
    await loginUser(email, password);

    // Displaying a success toast notification
    // Toast.fire({
    //     icon: 'success',
    //     title: 'Signed Up Successfully'
    // });

    // Returning data and error information
    return { data, error: null };
  } catch (error) {
    // Handling errors and returning data and error information
    return {
      data: null,
      error: error.response.data || "Something went wrong",
    };
  }
};

// Function to handle user login
export const loginUser = async (email, password) => {
  try {
    /* 
      ma miaim be in link 'http://localhost:8000/api/user/token/' darkhast 'POST' mizanim va bayad 'email va password'
      behesh bedim miad baramun 'refresh va access token' mide ke ma oun ro az 'data' migirim.
    */
    const response = await axiosAPIInstance.post("user/login/token/", {
      email,
      password,
    });
    console.log("response: ", response); // مشاهده پاسخ

    // If the request is successful (status code 200), set authentication user and display success toast
    if (response.status === 200) {
      /* 
      hala ke refresh va access token gereftim midim be 'setTokenInCookie' ta biad oun ro dakhel 'cookie' bezare va 
      az dakhel 'token' biad 'data user' ro begire va dakhel 'allUserData' male 'store zustand' zakhire kone.
      */
      setTokenInCookie(response.data.access, response.data.refresh);

      // Displaying a success toast notification
      // Toast.fire({
      //     icon: 'success',
      //     title: 'Signed in successfully'
      // });
    }

    // Returning data and error information
    return { data: response.data, error: null };
  } catch (error) {
    // Handling errors and returning data and error information
    console.log("error:", error); // مشاهده خطا
    return {
      data: null,
      error: error.response?.data?.detail || "Something went wrong",
    };
  }
};

// dar in function miaim access va refresh token midim va dakhel cookie gharar mide.
export const setTokenInCookie = (access_token, refresh_token) => {
  // Setting access and refresh tokens in cookies with expiration dates
  Cookies.set("access_token", access_token, {
    expires: 1, // Access token expires in 1 day
    secure: true,
  });

  Cookies.set("refresh_token", refresh_token, {
    expires: 7, // Refresh token expires in 7 days
    secure: true,
  });

  // inja migim age 'data user' dakhel 'token' bud pas bia dakhel 'userData' bezaresh age nabud ke 'null' bezaresh.
  const userData = jwtDecode(access_token) ?? null;

  // If userData null nabud va data user dakhelesh bud bia bro dakhel useAuthStore ke male state zustand ast va meghdar userData ro
  if (userData) {
    /* 
      inja ham ba estefade az 'getState' ke male khod 'zustand' mitunim 'state useAuthStore' dastresi dashte bashim va ba seda zadan 'setUserData' mitunim 
      meghdar 'data user' ke az 'token' gereftim ro ke dakhel 'userData' gozashtim behesh befrestim va oun ham miad dakhel 'store' baramun meghdar 'data user' 
      ro dakhel 'allAuthData' mizar va age ma 'data user' ro khastim mitunim az 'function user' dakhel 'useAuthStore' estefade konim.
    */
    console.log("userData:", userData);
    useAuthStore.getState().setUserData(userData);
  }
  useAuthStore.getState().setLoading(false);
};

// Function to handle user logout
export const logout = () => {
  // Removing access and refresh tokens from cookies, resetting user state, and displaying success toast
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");

  /* 
    vaghti 'user' oumad 'logout' kard bia 'token' oun 'user' ro az 'cookie' pak kon va meghdar 'allUserData' ro ke dakhel 'store zustand' sakhtim ro 'null' bezar 
    ke dige 'data user' nabashe chon dige 'token' ham nist.
  */
  useAuthStore.getState().setUserData(null);

  // Displaying a success toast notification
  // Toast.fire({
  //     icon: 'success',
  //     title: 'You have been logged out.'
  // });
};

/* 
  in function vaghti safhe ejra mishe 'check' mikone ke 'token' az 'cookie' gerefte mishe 'zaman expired' shode ya na ke age shode bud biad 'refresh token' ro bede
  va dobare token jadid begire va dakhel 'cookie' gharar bede .
*/
export const updateUserToken = async () => {
  // Retrieving access and refresh tokens from cookies
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");

  // age 'token' vojud nadasht 'null' return mikone.
  if (!accessToken || !refreshToken) {
    return;
  }

  /*
    agar tarikh 'expired token' tamum shode bashe behesh 'accessToken' midim va baramun ba estefade az 'function getRefreshToken' estefade
    mikonim ta dobare 'access va refresh token' bede.
  */
  if (isAccessTokenExpired(accessToken)) {
    const response = await getRefreshToken(refreshToken);
    // oun 'access va refresh token' ke dobare gereftim ro miaim dakhel 'cookie' gharar midim.
    setTokenInCookie(response.access, response.refresh);
  } else {
    // age 'tarikh expired token' tamum nashode bud oun 'access va refresh token' ro dakhel 'cookie' zakhire mikonim.
    setTokenInCookie(accessToken, refreshToken);
  }
};

// Function to refresh the access token using the refresh token
export const getRefreshToken = async () => {
  // Retrieving refresh token from cookies and making a POST request to refresh the access token
  const refresh_token = Cookies.get("refresh_token");
  const response = await axiosAPIInstance.post("user/token/refresh/", {
    refresh: refresh_token,
  });

  // Returning the refreshed access token
  return response.data;
};

// Function to check if the access token is expired
export const isAccessTokenExpired = (accessToken) => {
  try {
    // inja miaim 'data' dakhel 'cookie' ro mesl 'data user' va 'zaman expired token' ro migirim.
    const decodedToken = jwtDecode(accessToken);
    // inja check mikonim 'tarikh expired token' ke be 'millisecond' kamtar az 'tarikh emruz' ke be 'millisecond' tabdil kardim hast ya na.
    return decodedToken.exp < Date.now() / 1000;
  } catch (err) {
    // Returning true if the token is invalid or expired
    return true;
  }
};
