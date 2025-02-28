// libraries
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosAPIInstance from "../../utils/axios";
import Swal from "sweetalert2";

// sakht tanzimat sweetalert2
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

function CreateNewPassword() {
  /*
    dar inja ma mikhaim az 'user' betunim oun 'data' ro ke az 'link' dakhel 'email' ke barash ferestadim begirim va 
    ba estefade az 'useSearchParams' mitunim 'data' ro begirim va mitunim ba estefade az 'FormData' biaim 'object'
    besazim va behesh 'name va value' bedim va oun 'object' ro be 'url' ke mikhaim 'post' konim va dar 'back-end'
    'data' ro begirim va bebinim kodum 'user' mikhad 'password avaz kone' va oun 'password' ro barash set konim.
  */

  const [searchParams] = useSearchParams();

  const userOtp = searchParams.get("otp");
  const userUidb64 = searchParams.get("uidb64");

  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleOnChangeInput = (event) =>
    setNewPassword((previousData) => ({
      ...previousData,
      [event.target.name]: event.target.value,
    }));

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    if (newPassword.password !== newPassword.confirmPassword) {
      alert("Password does not match!");
    } else {
      /* 
        inja ma miaim ba estefade az 'FormData' miaim yek 'object' misazim ke behesh 'name va value' midim va 
        in 'object' ro midim be 'back-end'
      */
      const userFormData = new FormData();

      userFormData.append("otp", userOtp);
      userFormData.append("uidb64", userUidb64);
      userFormData.append("password", newPassword.password);

      try {
        /* 
          inja miaim be 'API call' mikonim va 'data user' ro be 'url' ke dar 'back-end' gharar 'data' ro begire va 
          bebine kodum 'user request dade' va biad 'password' jadid barash 'set' kone.
        */
        await axiosAPIInstance
          .post("user/password-change/", userFormData)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.message,
            });
            navigate("/login");
          });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: error,
        });
      }
    }
  };

  return (
    <>
      <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
        <div className="container">
          <section className="">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-5 col-md-8">
                <div className="card rounded-5">
                  <div className="card-body p-4">
                    <h3 className="text-center">Create New Password</h3>
                    <br />

                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                      >
                        <form onSubmit={handleSubmitForm}>
                          {/* Password input */}
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="Full Name">
                              Enter New Password
                            </label>
                            <input
                              onChange={handleOnChangeInput}
                              type="password"
                              id="password"
                              required
                              name="password"
                              className="form-control"
                            />
                          </div>
                          {/* Confirm Password */}
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="Full Name">
                              Confirm New Password
                            </label>
                            <input
                              onChange={handleOnChangeInput}
                              type="password"
                              id="email"
                              required
                              name="confirmPassword"
                              className="form-control"
                            />
                            {/* Check Passwords */}
                            <p className="fw-bold text-danger">
                              {newPassword.confirmPassword !==
                              newPassword.password
                                ? "Passwords do not match"
                                : ""}
                            </p>
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                            >
                              Reset Password
                            </button>
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

export default CreateNewPassword;
