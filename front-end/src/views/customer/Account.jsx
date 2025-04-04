// Libraries
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Sidebar
import Sidebar from "./Sidebar";

// Plugins
import UseProfileData from "../plugin/UseProfileData";
import UserData from "../plugin/UserData";

// sakht tanzimat sweetalert2
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

function Account() {
  //! Custom Hooks

  const userData = UserData();

  const userProfile = UseProfileData();

  const navigate = useNavigate();
  const location = useLocation();

  //! useEffect

  useEffect(() => {
    if (!userData?.user_id) {
      navigate("/login", {
        state: { from: location?.pathname },
        replace: true,
      });
      return; // برای جلوگیری از ادامه اجرا
    }
  }, []);

  //! JSX

  return (
    <div>
      <main className="mt-5" style={{ marginBottom: "170px" }}>
        <div className="container">
          <section className="">
            <div className="row">
              <Sidebar />
              <div className="col-lg-9 mt-1">
                <main className="mb-5" style={{}}>
                  {/* Container for demo purpose */}
                  <div className="container px-4">
                    {/* Section: Summary */}
                    <section className=""></section>
                    {/* Section: Summary */}
                    {/* Section: MSC */}
                    <section className="">
                      <div className="row rounded shadow p-3">
                        <h2>Hi {userProfile?.user?.fullname}, </h2>
                        <div className="col-lg-12 mb-4 mb-lg-0 h-100">
                          From your account dashboard. you can easily check
                          &amp; view your <a href="">orders</a>, manage your
                          <a href="">
                            {/* <shipping address="" a="">
                              ,
                            </shipping> */}
                          </a>
                          <a href="">change password</a> and
                          <a href="">edit account</a> information.
                        </div>
                      </div>
                    </section>
                    {/* Section: MSC */}
                  </div>
                  {/* Container for demo purpose */}
                </main>
              </div>
            </div>
          </section>
          {/*Section: Wishlist*/}
        </div>
      </main>
    </div>
  );
}

export default Account;
