import axios from 'axios';
import { getRefreshToken, isAccessTokenExpired, setTokenInCookie } from './auth'; // Import authentication-related functions
import { API_BASE_URL } from './constants'; // Import the base API URL
import Cookies from 'js-cookie'; // Import the 'js-cookie' library for managing cookies

/* 
    in nemune az 'axios' ro sakhtim ta har moghe ke 'API call' mizanim miad 'token' ro check mikone age 
    'tarikh expired token' gozashte bud miad 'getRefreshToken' ro seda mizane va 'token' jadid migire. 
    badesh ham miad oun 'token' ro ke gerefte ba estefade az 'setTokenInCookie' dakhel 'cookie' zakhire mikone va 
    'data user' ke dakhel oun 'token' hast ro dakhel 'allAuthData' dakhel 'store zustand' zakhire mikone.
*/
const useAxios = () => {
    // Retrieve the access and refresh tokens from cookies
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    // Create an Axios instance with base URL and access token in the headers
    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    /* 
        ma inja mitunim ba estefade az 'interceptors' ghabl va bad az darkhast 'API call' ke mizanim ro modiriat 
        konim va 'code benevisim ya shart bezarim' hala alan ham migim 'request.use' yani ghabl az darkhast bia in 
        'code' ke migim ejra kon. 
        dar inja 'req' hamun darkhast 'API call' hast ke mikhaim ghablesh 'code' ejra beshe.
    */
    axiosInstance.interceptors.request.use(async (req) => {
        /* 
            code ke mikhaim ghabl API call ejra beshe check kardan ine ke tarikh expired token tamum shode ya na:
            age tamum nashode bia hamun 'req' ya darkhasti ke mikhastim ro ejra kon yani be karet edame bede
            ama age tarikh expired token tamum shode bia dobare 'getRefreshToken' ro seda bezan ta 'token' jadid 
            behet bede.
        */
        if (!isAccessTokenExpired(accessToken)) {
            return req; // If not expired, return the original request
        }

        // If the access token is expired, refresh it
        const response = await getRefreshToken(refreshToken);

        /* 
            badesh ham miad oun 'token' ro ke gerefte ba estefade az 'setTokenInCookie' dakhel 'cookie' 
            zakhire mikone va 'data user' ke dakhel oun 'token' hast ro dakhel 'allAuthData' dakhel 
            'store zustand' zakhire mikone.
        */
        setTokenInCookie(response.access, response.refresh);

        // in neshun mide ke ma mikhaim user ba token ehraz hoviat kone na in ke biad har dafe ba 'email va password' bezane. 
        req.headers.Authorization = `Bearer ${response.data.access}`;
        
        return req; // Return the updated request
    });

    return axiosInstance; // Return the custom Axios instance
};

export default useAxios; // Export the custom Axios instance creator function

/*
نقش 
Interceptors 
در 
Axios

اینترسپتورها در 
Axios 
قابلیت‌هایی برای کنترل و مدیریت درخواست‌ها و پاسخ‌ها فراهم می‌کنند. به این ترتیب
:

request interceptors: 
به شما اجازه می‌دهد پیش از ارسال درخواست، کدی اجرا کنید، مانند افزودن هدر، بررسی توکن، یا تغییر داده‌ها.

response interceptors: 
پس از دریافت پاسخ، می‌توان داده‌ها را پردازش کرد، خطاها را مدیریت کرد، یا حتی پاسخ را تغییر داد.
*/