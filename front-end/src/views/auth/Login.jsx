// libraries
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/auth";
import { useAuthStore } from "../../store/authStore";
import Swal from "sweetalert2";

// sakht tanzimat sweetalert2
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

function Login() {
  // sakht yek 'state' baraye 'email va password user' ke mikhaim az 'input' begirim va be 'function login' dar 'auth.js' befrestim va 'token user' dar 'cookie' zakhire shavad.
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  /* 
    in state baraye ine begim age 'API call login' khastim bokonim safhe khali neshun nade bal ke bia 'loading' neshun bede. 
    bad az daryaft pasokh 'API call' dige 'loading' ro 'false' mikonim.
  */
  const [isLoading, setIsLoading] = useState(false);

  // in baraye 'redirect user' bad az 'login' kardan hast.
  const navigate = useNavigate();

  // mikhaim 'isLoggedIn' ro az state begirim vaghti 'refresh' shod dakhel 'useEffect' biad check kone 'user login' hast ya na
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  /* 
    ma baraye in ke betunim befahmim 'user' az kodum safhe oumade bayad az 'useLocation' estefade konim:

    dakhel 'location' ma az 'object state' estefade mikonim ta 'data' ekhtiari gharar bedim. 
    hala miaim migim dakhel 'state' yek 'object' dige be esm 'prevLocation' misazim va vaghti ke 'user' az har safhe miad 
    'login' kone mitunim data oun 'location' ro dakhelesh gharar bedim; hala oun data chia mitune bashe: 

    pathname: inja 'address' safhe ke 'user' azash oumade behemun mige masalan: "/products"

    search: inja agar 'url' ke 'user' azash oumade dakhelesh 'parameter' dashte bashe mitunim ounaro begirim ta 
    dobare 'user' ro be oun 'url' bargardunim.

    hash: inja bakhsh 'hash url' negahdari mishe.

    hala har vaghti khastim azash estefade konim bayad dar oun safhe ke mikhaim 'user' bere 'login' dobare bargarde
    biaim in 'object' ro kenar 'navigate' besazim:

    در صفحه‌ای که ورود لازمه، مثلاً صفحه محصولات
    
    const location = useLocation();
    navigate("/login", { preLocation: { from: location } });
  */
  const location = useLocation();

  const handleOnChangeInput = (event) => {
    /*
      ma mitunim be jaye in ke vase har input yek 'onChange' motafavete besazim mitunim yek 'onChange' benevisim vali dakhelesh bayed 
      moshakhas konim ke 'value' marbut be kodum 'input' hast ke ba estefade az 'switch, case' in kar ro mikonim va baraye har input 
      yek 'name' mizarim.
    */

    /* 
      console.log(event);
      dakhel in 'event' meghdar ziadi vojud dare vali ba zadan 'event.target' manzur hamun 'input' hast ke taghyir peida karde
      hala baraye in ke tashkhis bedim taghyir marbut be kodum 'input' miaim migim 'event.target.name' ba in mitunim 'name' 
      marbut be kodum 'input' ro befahmim va 'event.target.value' mitunim value marbut be input ro begirim
    */

    /*
    switch (event.target.name) {
      case "email":
        
        ? alan mibinim ke ba gozashtan meghdar 'value input' dakhel 'useState' tamame 'object' pak mishe va faghat mizane 'email' gharar migire
        ? baraye in ke baghie maghadir 'object' pak nashe bayad ye 'copy' az tamame chizi ke dakhel moteghayer darim ro dakhel 'object' bezarim
        ? va faghat oun mizane ke mikhaim ro taghyir bedim.
        ? dar inja ma dakhel moteghayer 'useState' miaim az 'arrow function' estefade mikonim. dalil asli ine ke betunim meghdar ghabli
        ? dakhel vorudi migirim ke mishe azash baraye 'copy' gereftan estefade kard.
        ? hala dakhel 'function' miaim meghdar ghabli dakhel 'object' moteghayer 'useState' ro 'copy' mikonim daghighan dakhel 'object' va
        ? amalan mohtaviat dakhel 'object' moteghayer ro 'copy' mikonim dakhel ye 'object' dige va oun meghdari ke mikhaim ro az oun ja
        ? taghyir midim.
        ? dalil in ke dar 'arrow function' '() => ()' az parantez estefade kardim ine ke mikhaim harchi dakhelesh hast vasamun 'return' beshe
        ? va dige niazi be neveshtan 'return' nist.
      
        setCreateArticle((prevStateData) => ({
          ? inja tamame mohtaviat 'object' ke dakhel 'useState' dashtim dakhel in 'object' rikhte mishe mesl ye 'copy' ke behesh 'sprat' migan.
          
          ...prevStateData,

          ? dar inja ham faghat mizan 'email' darun 'object' ro avaz mikonim va meghdar jadid ro gharar midim.
          
          email: event.target.value,
        }));
        break;

      case "password":
        setCreateArticle((prevStateData) => ({
          ? inja tamame mohtaviat 'object' ke dakhel 'useState' dashtim dakhel in 'object' rikhte mishe mesl ye 'copy' ke behesh 'sprat' migan.
          
          ...prevStateData,
          
          ? dar inja ham faghat mizan 'password' darun 'object' ro avaz mikonim va meghdar jadid ro gharar midim.
          
          password: event.target.value,
        }));
        break;
    }
    */

    /* 
      ma mitunim be jaye in ke az 'switch, case' estefade konim mitunim ba estefade az 'name' ke be input ha dadim be shart in ke 'name'
      bayad daghighan barabar mizan avalie hamun dakhel 'object' avalie 'useState' bashe.
      alan mitunim be rahati az 'event.target.name' estefade konim va meghdar dehi konim.
    */
    setUserData((prevStateData) => ({
      // inja tamame mohtaviat 'object' ke dakhel 'useState' dashtim dakhel in 'object' rikhte mishe mesl ye 'copy' ke behesh 'sprat' migan.
      ...prevStateData,
      // dar inja ham faghat mizan 'name' darun 'object' ro avaz mikonim va meghdar jadid ro gharar midim.
      [event.target.name]: event.target.value,
    }));
  };

  /* 
    alan mikhaim 'user' ba zadan 'button' betune 'login' bokone hala in 'login' kardan momkene zaman bebare chon:
    dakhel 'function login' miad 'API call' mikone 'email va password' migire va behesh 'token' mide.
    bad gereftan 'token' miad oun ro dakhel 'cookie user' gharar mide.
    bad az gozashtan 'token' dakhel 'cookie' miad 'data user' ro ke dar 'token' hast migire va 
    dakhel 'allUserData' dar 'store zustand' gharar mide.
  */
  const handleFormSubmit = async (event) => {
    // chon 'default form reload' kardan safhe ast pas mikhaim in 'default' anjam nashe.
    event.preventDefault();

    // alan miaim 'isLoading' ro 'true' mikonim ta bejaye safhe khali 'loading' neshun bede ta 'user login' beshe.
    setIsLoading(true);

    // inja user miad 'login' mikone va 'email va password' behesh midim.
    const { error } = await loginUser(userData.email, userData.password);
    if (error) {
      console.log("error when user want to login...", error);
      Swal.fire({
        icon: "error",
        title: error.response.data.detail,
      });
    } else {
      // bad az 'login user' miaim dakhel 'state' ro khali mikonim mesl ghabl.
      setUserData({ email: "", password: "" });
      // dige bad az 'login user' miaim isLoading ro 'false' mikonim.
      setIsLoading(false);
      Toast.fire({
        icon: "success",
        title: "Login Successfully",
      });
      navigate(location.state?.preLocation || "/");
    }
    console.log(userData);
    console.log("Is user logged in?", isLoggedIn());
    console.log("Is loading ?", isLoading);
    console.log("isLoggedIn:", useAuthStore.getState().allUserData);
    // age darkhast 'login user error' nadasht bashe va 'user login' beshe miad 'redirect' mikone safhe home.
  };

  /* 
    dar akhar ham miaim az 'useEffect' estefade mikonim migim age 'refresh' shod bia check kon dakhel 
    'store zustand' age 'allUserData null' nabud yani 'user login' hast va 'data user' az 'token' gerefte shode 
    va dakhel 'allUserData' hast pas natije migirim 'user login' pas age 'isLoggedIn true' bud bia 'user' ro be 
    safhe 'home redirect' bokon.
    */
  useEffect(() => {
    if (isLoggedIn()) {
      console.log("Is user logged in?", isLoggedIn());
      // inja niazi nist 'pathname' bezarim khod 'navigate' az data dakhel 'object preLocation' estefade mikone.
      navigate(location.state?.preLocation || "/");
    }
  }, []);

  return (
    <>
      <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
        <div className="container">
          {/* Section: Login form */}
          <section className="">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-5 col-md-8">
                <div className="card rounded-5">
                  <div className="card-body p-4">
                    <h3 className="text-center">Login</h3>
                    <br />
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                      >
                        <form onSubmit={handleFormSubmit}>
                          {/* Email input */}
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="email">
                              Email Address
                            </label>
                            <input
                              onChange={handleOnChangeInput}
                              type="email"
                              id="email"
                              name="email"
                              className="form-control"
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <label
                              className="form-label"
                              htmlFor="loginPassword"
                            >
                              Password
                            </label>
                            <input
                              onChange={handleOnChangeInput}
                              type="password"
                              id="password"
                              name="password"
                              className="form-control"
                            />
                          </div>

                          {isLoading ? (
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              <span className="mr-2">Processing </span>
                              <i className="fas fa-spinner fa-snip" />
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              <span className="mr-2">Sign In </span>
                              <i className="fas fa-sign-in-alt" />
                            </button>
                          )}

                          <div className="text-center">
                            <p className="mt-4">
                              Don't have an account?
                              <Link to="/register">Register</Link>
                            </p>
                            <p className="mt-0">
                              <Link
                                to="/password-reset/"
                                className="text-danger"
                              >
                                Forgot Password?
                              </Link>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Login;
