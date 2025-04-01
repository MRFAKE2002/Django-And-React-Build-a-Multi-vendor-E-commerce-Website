// Libraries
import { Navigate } from "react-router-dom";

// store of zustand
import { useAuthStore } from "../store/authStore";

const PrivateRoute = ({ children }) => {
  //! zustand

  // Use the 'useAuthStore' hook to check the user's authentication status.
  // It appears to be using a state management solution like 'zustand' or 'mobx-state-tree'.
  // const loggedIn = useAuthStore((state) => state.isLoggedIn)();
  const loggedIn = useAuthStore((state) => state.allUserData !== null);

  //! JSX

  // Conditionally render the children if the user is authenticated.
  // If the user is not authenticated, redirect them to the login page.
  return loggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
