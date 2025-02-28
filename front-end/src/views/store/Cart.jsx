// Libraries
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// API functions
import axiosAPIInstance from "../../utils/axios";

// Plugin functions
import CartID from "../plugin/CartID";
import UserData from "../plugin/UserData";

function Cart() {
  //! Custom States

  const [cartData, setCartData] = useState([]);
  console.log(`cart data`, cartData);

  const [cartDetail, setCartDetail] = useState([]);
  console.log(`cart data`, cartDetail);

  const cartID = CartID();
  const userData = UserData();

  //! Custom Functions

  // inja miaim 'function' misazim migim 'cartID va userID' ro begirim va 'data' male 'cart' ro az 'API' begirim.
  const fetchCartData = (cartID, userID) => {
    const url = userID
      ? `cart-list/${cartID}/${userID}/`
      : `cart-list/${cartID}/`;

    axiosAPIInstance
      .get(url)
      .then((response) => {
        setCartData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchCartDetail = (cartID, userID) => {
    const url = userID
      ? `cart-detail/${cartID}/${userID}/`
      : `cart-detail/${cartID}/`;

    axiosAPIInstance
      .get(url)
      .then((response) => {
        setCartDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // hala miaim oun 'function' ro ke sakhtim seda mizanim.
  if (cartID !== null || userData !== undefined) {
    if (userData !== undefined) {
      useEffect(() => {
        fetchCartData(cartID, userData?.user_id);
        fetchCartDetail(cartID, userData?.user_id);
      }, []);
    } else {
      useEffect(() => {
        fetchCartData(cartID, null);
        fetchCartDetail(cartID, null);
      }, []);
    }
  }

  //! JSX

  return (
    <>
      <main className="mt-5">
        <div className="container">
          {/*Main layout*/}
          <main className="mb-6">
            <div className="container">
              {/* Section: Cart */}
              <section className="">
                <div className="row gx-lg-5 mb-5">
                  <div className="col-lg-8 mb-4 mb-md-0">
                    {/* Section: Product list */}
                    <section className="mb-5">
                      {cartData?.map((cart, index) => (
                        <div className="row border-bottom mb-4" key={index}>
                          <div className="col-md-2 mb-4 mb-md-0">
                            <div
                              className="bg-image ripple rounded-5 mb-4 overflow-hidden d-block"
                              data-ripple-color="light"
                            >
                              <Link to={`/detail/${cart?.product?.slug}`}>
                                <img
                                  src={cart?.product?.image}
                                  className="w-100"
                                  alt=""
                                  style={{
                                    height: "100px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                />
                              </Link>
                              <a href="#!">
                                <div className="hover-overlay">
                                  <div
                                    className="mask"
                                    style={{
                                      backgroundColor:
                                        "hsla(0, 0%, 98.4%, 0.2)",
                                    }}
                                  />
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col-md-8 mb-4 mb-md-0">
                            <Link
                              to={`/detail/${cart.product.slug}`}
                              className="fw-bold text-dark mb-4"
                            >
                              {cart?.product?.name.slice(0, 20)}...
                            </Link>
                            {cart.size != "No Size" && (
                              <p className="mb-0">
                                <span className="text-muted me-2">Size:</span>
                                <span>{cart.size}</span>
                              </p>
                            )}
                            {cart.color != "No Color" && (
                              <p className="mb-0">
                                <span className="text-muted me-2">Color:</span>
                                <span>{cart.color}</span>
                              </p>
                            )}
                            <p className="mb-0">
                              <span className="text-muted me-2">Price:</span>
                              <span>${cart.product.price}</span>
                            </p>
                            <p className="mb-0">
                              <span className="text-muted me-2">
                                Stock Quantity:
                              </span>
                              <span>{cart.product.stock_quantity}</span>
                            </p>
                            <p className="mb-0">
                              <span className="text-muted me-2">Vendor:</span>
                              {/* <span>{c.product.vendor.name}</span> */}
                            </p>
                            <p className="mt-3">
                              <button
                                // onClick={() => handleDeleteClick(cart_id, c.id)}
                                className="btn btn-danger "
                              >
                                <small>
                                  <i className="fas fa-trash me-2" />
                                  Remove
                                </small>
                              </button>
                            </p>
                          </div>
                          <div className="col-md-2 mb-4 mb-md-0">
                            <div className="d-flex justify-content-center align-items-center">
                              <div className="form-outline">
                                <input
                                  type="number"
                                  id={`quantityInput-${cart.product.id}`}
                                  className="form-control"
                                  // onChange={(e) =>
                                  //   handleQtyChange(e, cart.product.id)
                                  // }
                                  // value={
                                  //   productQuantities[cart.product.id] || cart.qty
                                  // }
                                  min={1}
                                />
                              </div>
                              <button
                                // onClick={() =>
                                //   UpdateCart(
                                //     cart_id,
                                //     c.id,
                                //     c.product.id,
                                //     c.product.price,
                                //     c.product.shipping_amount,
                                //     c.color,
                                //     c.size
                                //   )
                                // }
                                className="ms-2 btn btn-primary"
                              >
                                <i className="fas fa-rotate-right"></i>
                              </button>
                            </div>
                            <h5 className="mb-2 mt-3 text-center">
                              <p className="align-middle small text-muted">
                                SubTotal
                              </p>
                              <span className="align-middle">
                                ${cart.sub_total}
                              </span>
                            </h5>
                          </div>
                        </div>
                      ))}

                      {cartData.length < 1 && (
                        <>
                          <h5>Your Cart Is Empty</h5>
                          <Link to="/">
                            <i className="fas fa-shopping-cart"></i> Continue
                            Shopping
                          </Link>
                        </>
                      )}
                    </section>
                    <div>
                      <h5 className="mb-4 mt-4">Personal Information</h5>
                      {/* 2 column grid layout with text inputs for the first and last names */}
                      <div className="row mb-4">
                        <div className="col">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="full_name">
                              <i className="fas fa-user"></i> Full Name
                            </label>
                            <input
                              type="text"
                              id=""
                              name="fullName"
                              className="form-control"
                              // onChange={handleChange}
                              // value={fullName}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              <i className="fas fa-envelope"></i> Email
                            </label>
                            <input
                              type="text"
                              id="form6Example1"
                              className="form-control"
                              name="email"
                              // onChange={handleChange}
                              // value={email}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              <i className="fas fa-phone"></i> Mobile
                            </label>
                            <input
                              type="text"
                              id="form6Example1"
                              className="form-control"
                              name="mobile"
                              // onChange={handleChange}
                              // value={mobile}
                            />
                          </div>
                        </div>
                      </div>

                      <h5 className="mb-1 mt-4">Shipping address</h5>

                      <div className="row mb-4">
                        <div className="col-lg-6 mt-3">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              id="form6Example1"
                              className="form-control"
                              name="address"
                              // onChange={handleChange}
                              // value={address}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-3">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              City
                            </label>
                            <input
                              type="text"
                              id="form6Example1"
                              className="form-control"
                              name="city"
                              // onChange={handleChange}
                              // value={city}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mt-3">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              State
                            </label>
                            <input
                              type="text"
                              id="form6Example1"
                              className="form-control"
                              name="state"
                              // onChange={handleChange}
                              // value={state}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mt-3">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form6Example1"
                            >
                              Country
                            </label>
                            <input
                              type="text"
                              id="form6Example1"
                              className="form-control"
                              name="country"
                              // onChange={handleChange}
                              // value={country}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 mb-4 mb-md-0">
                    {/* Section: Summary */}
                    <section className="shadow-4 p-4 rounded-5 mb-4">
                      <h5 className="mb-3">Cart Summary</h5>
                      <div className="d-flex justify-content-between mb-3">
                        <span>Subtotal </span>
                        <span>${cartDetail.sub_total?.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Shipping </span>
                        <span>${cartDetail.shipping?.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Tax </span>
                        <span>${cartDetail.tax?.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Service Fee </span>
                        <span>${cartDetail.service_fee?.toFixed(2)}</span>
                      </div>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between fw-bold mb-5">
                        <span>Total </span>
                        <span>${cartDetail.total?.toFixed(2)}</span>
                      </div>
                      {cartData.length > 0 && (
                        <button
                          // onClick={createCartOrder}
                          className="btn btn-primary btn-rounded w-100"
                        >
                          Got to checkout
                        </button>
                      )}
                    </section>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </main>
    </>
  );
}

export default Cart;
