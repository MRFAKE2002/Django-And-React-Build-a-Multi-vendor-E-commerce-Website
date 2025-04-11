// libraries
import { useEffect, useState } from "react";

// auth functions
import { updateUserToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function MainWrapper({ children }) {
  const navigate = useNavigate();

  /*
    nahve kar in component injuri ke shoma har moghe dakhel 'site' mishid miad 'check' mikone ke shoma 
    dakhel 'cookie access token ya refresh token' dari ya na be ebarati mige 'login' hasti ya na hala:
    
    age 'login' nabud miad khali 'return' mikone.
    
    age 'login' bud miad aval 'tarikh expired token' ro 'check' mikone age 'tamum shode' bud miad 'refresh token' jadid misaze
    age 'tarikh expired token tamum nashode' bud miad dobare hamun 'access va refresh token' ro ke az 'cookie' gerefte 
    dobare be 'cookie' ezafe mikone va 'data user' ke dakhel oun 'token' hast ro dakhel 'zustand store' mizare ta bedunim
    'isLoggedIn' dakhel 'zustand store True bar migardune'.

    injuri age ma 'site' ro 'refresh' ham bokonim bazam in 'porose' etefagh miofte va moshakhas mishe 'isLoggedIn'
    dakhel 'zustand store True bar migardune ya False'. 
  */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handle = async () => {
      setLoading(true);
      navigate("/login", {
        state: { from: location?.pathname },
        replace: true,
      });
      await updateUserToken();
      setLoading(false);
    };

    handle();
  }, []);

  return <>{loading ? null : children}</>;
}

export default MainWrapper;
