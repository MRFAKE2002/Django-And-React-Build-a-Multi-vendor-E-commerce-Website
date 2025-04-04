// Libraries
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

// API Function
import axiosAPIInstance from "../../utils/axios";

// Plugin
import UserData from "../plugin/UserData";

// Sidebar
import Sidebar from "./Sidebar";

// sakht tanzimat sweetalert2
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

function Settings() {
  //! Custom States

  const [profileData, setProfileData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    about: "",
    country: "",
    city: "",
    state: "",
    address: "",
    profile_image: "",
  });
  // console.log(profileData);

  const [loading, setLoading] = useState(false);

  //! Custom Hooks

  const userData = UserData();
  
  const navigate = useNavigate();

  const location = useLocation();

  //! Custom Functions

  const handleInputChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.files[0],
    });
    // console.log(profileData);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await axiosAPIInstance.get(
      `user/profile/${userData?.user_id}/`
    );

    const formData = new FormData();
    if (
      profileData.profile_image &&
      profileData.profile_image !== response.data.image
    ) {
      formData.append("image", profileData.profile_image);
    }
    formData.append("full_name", profileData.full_name);
    formData.append("about", profileData.about);
    formData.append("country", profileData.country);
    formData.append("city", profileData.city);
    formData.append("state", profileData.state);
    formData.append("address", profileData.address);

    try {
      await axiosAPIInstance.patch(
        `user/profile/${userData?.user_id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Profile updated successfully",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  //! useEffect

  useEffect(() => {
    if (!userData?.user_id) {
      
      navigate("/login", {
        state: { from: location?.pathname },
        replace: true,
      });
      return; // برای جلوگیری از ادامه اجرا
    }

    // Fetch existing profile data
    const fetchProfileData = async () => {
      try {
        axiosAPIInstance
          .get(`user/profile/${userData?.user_id}/`)
          .then((response) => {
            setProfileData({
              full_name: response.data?.user?.fullname,
              email: response.data.user.email,
              phone: response.data.user.phone,
              about: response.data.about,
              country: response.data.country,
              city: response.data.city,
              state: response.data.state,
              address: response.data.address,
              profile_image: response.data.image,
            });
            console.log(response);
          });
      } catch (error) {
        Swal.fire({
          icon: error?.response.data.icon,
          title: error?.response.data.message,
        });
      }
    };

    fetchProfileData();
  }, []);

  //! JSX

  return (
    <div>
      <main className="mt-5">
        <div className="container">
          <section className="">
            <div className="row">
              <Sidebar />
              <div className="col-lg-9 mt-1">
                <section className="">
                  <main className="mb-5" style={{}}>
                    <div className="container px-4">
                      {/* Section: Summary */}
                      <section className="">
                        <h3 className="mb-3">
                          <i className="fas fa-gear fa-spin" /> Settings
                        </h3>
                        <form
                          onSubmit={handleFormSubmit}
                          method="POST"
                          encType="multipart/form-data"
                        >
                          <div className="row">
                            <div className="col-lg-12 mb-4">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Profile Image
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                aria-describedby="emailHelp"
                                onChange={handleFileChange}
                                name="profile_image"
                              />
                            </div>
                            <div className="col-lg-12">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Full Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                value={profileData?.full_name}
                                onChange={handleInputChange}
                                name="full_name"
                              />
                            </div>
                            <div className="col-lg-6 mt-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Email address
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                aria-describedby="emailHelp"
                                value={profileData?.email}
                                name="email"
                                readOnly
                              />
                            </div>
                            <div className="col-lg-6 mt-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Mobile
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                value={profileData?.phone}
                                name="phone"
                                readOnly
                              />
                            </div>
                          </div>
                          <br />
                          <div className="row">
                            <div className="col-lg-6 mt-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Address
                              </label>
                              <input
                                name="address"
                                value={profileData?.address}
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-lg-6 mt-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                City
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                value={profileData?.city}
                                name="city"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-lg-6 mt-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                State
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                value={profileData?.state}
                                name="state"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-lg-6 mt-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Country
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                value={profileData?.country}
                                name="country"
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          {loading === false && (
                            <button
                              type="submit"
                              className="btn btn-primary mt-5"
                            >
                              Save Changes
                            </button>
                          )}

                          {loading === true && (
                            <button disabled className="btn btn-primary mt-5">
                              Saving...
                              <i className="fas fa-spinner fa-spin"></i>
                            </button>
                          )}
                        </form>
                      </section>
                      {/* Section: Summary */}
                      {/* Section: MSC */}
                      {/* Section: MSC */}
                    </div>
                    {/* Container for demo purpose */}
                  </main>
                </section>
              </div>
            </div>
          </section>
          {/*Section: Wishlist*/}
        </div>
      </main>
    </div>
  );
}

export default Settings;
