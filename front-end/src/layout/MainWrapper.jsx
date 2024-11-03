// libraries
import { useEffect, useState } from "react";

// auth functions
import { updateUserToken } from "../utils/auth";

function MainWrapper({children}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handle = async () => {
      setLoading(true);
      await updateUserToken();
      setLoading(false);
    };

    handle();
  }, []);

  return <>{loading ? null : children}</>;
}

export default MainWrapper;
