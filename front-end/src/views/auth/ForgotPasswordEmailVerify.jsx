// libraries
import React, { useState } from "react";
import Swal from "sweetalert2";

// API call Instance
import axiosAPIInstance from "../../utils/axios";

// sakht tanzimat sweetalert2
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

function ForgotPasswordEmailVerify() {
  /*
    alan inja ma gharar ke vaghti 'user' oumad 'email' khodesh ro vared kard samt 'back-end' dakhel 
    'app userauths views ForgotPassword' biad 'check' kone age in 'user' vojud dasht biad behesh 'email' bede
    ke dakhel oun 'email link' vojud dare ke dakhelesh 'otp va uidb64 user' vojud dare ke ba raftan be oun 'link'
    mitune 'password' khodesh ro avaz kone va ma ham mitunim ba estefade az 'data' dakhel oun 'link' befahmim kodum 
    'user' oumade 'password' avaz kone va oun 'data' ro befrestim be 'back-end'.
  */
  const [email, setEmail] = useState("");

  const handleOnChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOnclick = async (event) => {
    try {
      // alan inja ma darim oun 'email' ro mifrestim be 'back-end' ta be 'user otp' bedim va befrestim
      // baraye 'change password'.
      await axiosAPIInstance
        .get(`user/password-reset/${email}/`)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: response.data.message,
          });
        });
    } catch (error) {
      Toast.fire({
        icon: "success",
        title: error,
      });
    }
  };
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
                    <h3 className="text-center">Forgot Password</h3>
                    <br />

                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                      >
                        <div>
                          {/* Email input */}
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="Full Name">
                              Email Address
                            </label>
                            <input
                              onChange={handleOnChange}
                              type="text"
                              id="email"
                              name="email"
                              className="form-control"
                            />
                          </div>

                          <div className="text-center">
                            <button
                              className="btn btn-primary w-100"
                              onClick={handleOnclick}
                            >
                              Reset Password
                            </button>
                          </div>
                        </div>
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

export default ForgotPasswordEmailVerify;
