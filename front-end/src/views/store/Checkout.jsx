// Libraries
import React, { useEffect, useState } from "react";

// API functions
import axiosAPIInstance from "../../utils/axios";
import { useParams } from "react-router-dom";

function Checkout() {
  const [order, setOrder] = useState([]);

  const param = useParams()
  // console.log(param.order_oid);


  useEffect(() => {
    axiosAPIInstance.get(`checkout/${param.order_oid}/`).then((response) => {
      console.log(response.data);
      console.log(response.data.order_items);
    })
    
  }, [])
  



  return (
    <div>
      <main>
        <main className="mb-4 mt-4">
          <div className="container">
            {/* Section: Checkout form */}
            <section className="">
              <div className="row gx-lg-5">
                <div className="col-lg-8 mb-4 mb-md-0">
                  {/* Section: Biling details */}
                  <section className="">
                    <div className="alert alert-warning">
                      <strong>Review Your Shipping &amp; Order Details </strong>
                    </div>
                    <form>
                      <h5 className="mb-4 mt-4">Shipping address</h5>
                      {/* 2 column grid layout with text inputs for the first and last names */}
                      <div className="row mb-4">
                        <div className="col-lg-12">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example2"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.full_name}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mt-4">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example2"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.email}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mt-4">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example2"
                            >
                              Mobile
                            </label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.mobile}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example2"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.address}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example2"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.city}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example2"
                            >
                              State
                            </label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.state}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example2"
                            >
                              Country
                            </label>
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              value={order.country}
                            />
                          </div>
                        </div>
                      </div>

                      <h5 className="mb-4 mt-4">Billing address</h5>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          defaultValue=""
                          id="form6Example8"
                          defaultChecked=""
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form6Example8"
                        >
                          Same as shipping address
                        </label>
                      </div>
                    </form>
                  </section>
                  {/* Section: Biling details */}
                </div>
                <div className="col-lg-4 mb-4 mb-md-0">
                  {/* Section: Summary */}
                  <section className="shadow-4 p-4 rounded-5 mb-4">
                    <h5 className="mb-3">Cart Summary</h5>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Subtotal </span>
                      <span>${order.sub_total}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Shipping </span>
                      <span>${order.shipping_amount}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Tax </span>
                      <span>${order.tax_fee}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Service Fee </span>
                      <span>${order.service_fee}</span>
                    </div>
                    <hr className="my-4" />
                    <div className="d-flex justify-content-between fw-bold mb-5">
                      <span>Total </span>
                      <span>${order.total}</span>
                    </div>

                    <div className="shadow p-3 d-flex mt-4 mb-4">
                      {/* {loading === true && ( */}
                      <>
                        <input
                          readOnly
                          // value={couponCode}
                          name="couponCode"
                          type="text"
                          className="form-control"
                          style={{ border: "dashed 1px gray" }}
                          placeholder="Enter Coupon Code"
                          id=""
                        />
                        <button disabled className="btn btn-success ms-1">
                          <i className="fas fa-spinner fa-spin"></i>
                        </button>
                      </>
                      {/* )} */}

                      {/* {loading === false && ( */}
                      <>
                        <input
                          // onChange={handleChange}
                          // value={couponCode}
                          name="couponCode"
                          type="text"
                          className="form-control"
                          style={{ border: "dashed 1px gray" }}
                          placeholder="Enter Coupon Code"
                          id=""
                        />
                        <button
                          // onClick={appleCoupon}
                          className="btn btn-success ms-1"
                        >
                          <i className="fas fa-check-circle"></i>
                        </button>
                      </>
                      {/* )} */}
                    </div>

                    {/* {paymentLoading === true && ( */}
                    <form
                      // action={`${API_BASE_URL}stripe-checkout/${param?.order_oid}/`}
                      method="POST"
                    >
                      <button
                        // onClick={payWithStripe}
                        type="submit"
                        className="btn btn-primary btn-rounded w-100 mt-2"
                        style={{ backgroundColor: "#635BFF" }}
                      >
                        Processing... <i className="fas fa-spinner fa-spin"></i>
                      </button>
                    </form>
                    {/* )} */}

                    {/* {paymentLoading === false && ( */}
                    <form
                      // action={`${API_BASE_URL}stripe-checkout/${param?.order_oid}/`}
                      method="POST"
                    >
                      <button
                        // onClick={payWithStripe}
                        type="submit"
                        className="btn btn-primary btn-rounded w-100 mt-2"
                        style={{ backgroundColor: "#635BFF" }}
                      >
                        Pay Now (Stripe)
                      </button>
                    </form>
                    {/* )} */}

                    {/* <PayPalScriptProvider options={initialOptions}>
                      <PayPalButtons
                        className="mt-3"
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "USD",
                                  value: order.total.toString(),
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then((details) => {
                            const name = details.payer.name.given_name;
                            const status = details.status;
                            const payapl_order_id = data.orderID;

                            console.log(status);
                            if (status === "COMPLETED") {
                              navigate(
                                `/payment-success/${order.oid}/?payapl_order_id=${payapl_order_id}`
                              );
                            }
                          });
                        }}
                      />
                    </PayPalScriptProvider> */}

                    {/* <button type="button" className="btn btn-primary btn-rounded w-100 mt-2">Pay Now (Flutterwave)</button>
                    <button type="button" className="btn btn-primary btn-rounded w-100 mt-2">Pay Now (Paystack)</button>
                    <button type="button" className="btn btn-primary btn-rounded w-100 mt-2">Pay Now (Paypal)</button> */}
                  </section>
                </div>
              </div>
            </section>
          </div>
        </main>
      </main>
    </div>
  );
}

export default Checkout;
