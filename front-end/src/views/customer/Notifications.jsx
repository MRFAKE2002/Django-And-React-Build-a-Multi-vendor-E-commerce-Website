// Libraries
import React, { useState, useEffect } from "react";
import moment from "moment";
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

function Notifications() {
  //! Custom State

  const [notifications, setNotifications] = useState([]);
  // const [loading, setLoading] = useState(true);

  //! Custom Hooks

  const userData = UserData();
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
    axiosAPIInstance
      .get(`customer/notifications/${userData?.user_id}/`)
      .then((response) => {
        setNotifications(response.data);
        // if (notifications) {
        //   setLoading(false);
        // }
      });
  }, []);

  // console.log(notifications);

  //! JSX

  return (
    <div>
      <main className="mt-5" style={{ marginBottom: 200 }}>
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
                          <i className="fas fa-bell" /> Notifications
                        </h3>
                        <div className="list-group">
                          {notifications.map((notification, index) => (
                            <a
                              href="#"
                              className="list-group-item list-group-item-action"
                              aria-current="true"
                              key={index}
                            >
                              <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">New Order!</h5>
                                <small>
                                  {moment(notification.date).format(
                                    "MM-DD-YYYY"
                                  )}
                                </small>
                              </div>
                              <p className="mb-1">
                                Your order #{notification?.order?.oid} was
                                successful
                              </p>
                              <small className="">
                                Total: ${notification?.order?.total}
                              </small>
                              <br />
                              <small className="">
                                Shipping: $
                                {notification?.order?.shipping_amount}
                              </small>
                              <br />
                              <small className="">
                                Tax: ${notification?.order?.tax_fee}
                              </small>
                              <br />
                              <small className="">
                                Service Fee: ${notification?.order?.service_fee}
                              </small>
                              <br />
                            </a>
                          ))}

                          {notifications.length < 1 && (
                            <h6>No notifications yet</h6>
                          )}
                        </div>
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

export default Notifications;
