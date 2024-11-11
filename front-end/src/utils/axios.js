// libraries
import axios from "axios";

/*
  dar inja ma mikhaim function besazim ke biad data ro ba estefade az 'axios' begirim va harja ke bekhaim ba seda zadan function data
  ro begirim in kar baraye tamizi va chandbar estefade kardan code ast.

  ma miaim ye moteghayer 'axiosAPIInstance' misazim ke tush miakhaim 'config' baraye 'axios' moshakhas konim. yani amalan ba zadan 'axios.create' 
  ma nemune sefareshi az 'axios' misazim ke in ejaze ro mide tanzimat pishfarz baraye darkhast ha gharar bedim.

  miaim migim 'baseUrl' ke dakhel url mishe oun tike az link ke sabete masalan: "http://localhost:8000/api/user/" dar inja bakhsh 
  "http://localhost:8000/api/" sabete va tike akhar taghyir mikone pas baraye in ke yek bar url ro moshakhas konim va age ruzi 
  back-end kar oumad taghyir dad ma faghat yek ja taghyir midim va niazi nist har bar dasti in kar ro konim.

  vaghti miaim 'axiosAPIInstance' misazim 'axios' miad be surat default darkhast ro 'GET' migire ta zamani ke darkhast ro moshakhas konim.
*/

const axiosAPIInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosAPIInstance;
