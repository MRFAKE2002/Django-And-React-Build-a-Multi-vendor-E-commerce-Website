// Libraries
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

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

function Orders() {
  //! Custom State

  const [orders, setOrders] = useState([]);

  //! Custom Hooks

  const userData = UserData();
  const navigate = useNavigate()
  const location = useLocation()

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
      .get(`customer/orders/${userData?.user_id}/`)
      .then((response) => {
        setOrders(response.data);
      });
  }, []);

  // console.log(orders);

  return (
    <div className="container mt-5">
      <section className="">
        <div className="row">
          <Sidebar />
          <div className="col-lg-9 mt-1">
            <main className="mb-5" style={{}}>
              {/* Container for demo purpose */}
              <div className="container px-4">
                {/* Section: Summary */}
                <section className="mb-5">
                  <h3 className="mb-3">
                    <i className="fas fa-shopping-cart text-primary" /> Orders
                  </h3>
                  <div className="row gx-xl-5">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                      <div
                        className="rounded shadow w-100 h-100"
                        style={{ backgroundColor: "#B2DFDB" }}
                      >
                        <div className="card-body">
                          <div className="d-flex px-3 align-items-center">
                            <div className="">
                              <p className="mb-1">Orders</p>
                              <h2 className="mb-0">
                                {orders.length}
                                <span
                                  className=""
                                  style={{ fontSize: "0.875rem" }}
                                ></span>
                              </h2>
                            </div>
                            <div className="flex-grow-1 ms-5">
                              <div className="p-3 self-center badge-primary rounded-4">
                                <i
                                  className="fas fa-shopping-cart fs-4"
                                  style={{ color: "#004D40" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-4 mb-lg-0">
                      <div
                        className="rounded shadow w-100 h-100"
                        style={{ backgroundColor: "#D1C4E9" }}
                      >
                        <div className="card-body">
                          <div className="d-flex px-3 align-items-center">
                            <div className="">
                              <p className="mb-1">Pending Delivery</p>
                              <h2 className="mb-0">
                                6
                                <span
                                  className=""
                                  style={{ fontSize: "0.875rem" }}
                                ></span>
                              </h2>
                            </div>
                            <div className="flex-grow-1 ms-5">
                              <div className="p-3 badge-primary rounded-4">
                                <i
                                  className="fas fa-clock fs-4"
                                  style={{ color: "#6200EA" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-4 mb-lg-0">
                      <div
                        className="rounded shadow w-100 h-100"
                        style={{ backgroundColor: "#BBDEFB" }}
                      >
                        <div className="card-body">
                          <div className="d-flex p-2 align-items-center">
                            <div className="">
                              <p className="mb-1">Fulfilled Orders</p>
                              <h2 className="mb-0">
                                2
                                <span
                                  className=""
                                  style={{ fontSize: "0.875rem" }}
                                ></span>
                              </h2>
                            </div>
                            <div className="flex-grow-1 ms-5">
                              <div className="p-3 badge-primary rounded-4">
                                <i
                                  className="fas fa-check-circle fs-4"
                                  style={{ color: "#01579B" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Section: Summary */}
                {/* Section: MSC */}
                <section className="">
                  <div className="row rounded shadow p-3">
                    <div className="col-lg-12 mb-4 mb-lg-0 h-100">
                      <table className="table align-middle mb-0 bg-white">
                        <thead className="bg-light">
                          <tr>
                            <th>Order ID</th>
                            <th>Payment Status</th>
                            <th>Order Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, index) => (
                            <tr key={index}>
                              <td>
                                <p className="fw-bold mb-1">#{order.oid}</p>
                                <p className="text-muted mb-0">
                                  {moment(order.date).format("MM/DD/YYYY")}
                                </p>
                              </td>
                              <td>
                                <p className="fw-normal mb-1">
                                  {order.payment_status.toUpperCase()}
                                </p>
                              </td>
                              <td>
                                <p className="fw-normal mb-1">
                                  {order.order_status}
                                </p>
                              </td>
                              <td>
                                <span className="fw-normal mb-1">
                                  ${order.total}
                                </span>
                              </td>
                              <td>
                                <Link
                                  className="btn btn-link btn-sm btn-rounded"
                                  to={`/customer/order/detail/${order.oid}/`}
                                >
                                  View <i className="fas fa-eye" />
                                </Link>
                                <Link
                                  className="btn btn-link btn-sm btn-rounded"
                                  to={`/customer/order/invoice/${order.oid}/`}
                                >
                                  Invoice <i className="fas fa-file-invoice" />
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <canvas
                      id="myChart"
                      style={{ width: "100%", height: "auto" }}
                    />
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
  );
}

export default Orders;
