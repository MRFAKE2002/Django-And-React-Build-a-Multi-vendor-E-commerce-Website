// Libraries
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// API functions
import axiosAPIInstance from "../../utils/axios";

// Plugin functions
import CartID from "../plugin/CartID";
import UserData from "../plugin/UserData";
import GetCurrentAddress from "../plugin/UserCountry";

// sakht tanzimat sweetalert2
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

function Cart() {
  //! Custom States

  const [cartData, setCartData] = useState([]);
  // console.log(`cart data`, cartData);

  const [cartDetail, setCartDetail] = useState([]);
  // console.log(`cart data`, cartDetail);

  const [productQuantity, setProductQuantity] = useState("");
  // console.log(`product quantity`, productQuantity);

  const [orderPersonalInformationForm, setOrderPersonalInformationForm] =
    useState({});
  console.log(orderPersonalInformationForm);

  const cartID = CartID();

  const userData = UserData();

  const currentAddress = GetCurrentAddress();

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
        // console.log(error);
        Swal.fire({
          icon: "error",
          title: response.data.message,
        });
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
        // console.log(error);
        Swal.fire({
          icon: "error",
          title: response.data.message,
        });
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

  const handleQuantityChange = (event, productID) => {
    const quantityInput = event.target.value;

    setProductQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productID]: quantityInput,
    }));
  };

  const handleUpdateCartOnClick = async (
    product_id,
    price,
    shipping_amount,
    color,
    size
  ) => {
    const quantityInput = productQuantity[product_id];

    try {
      // hala mikhaim 'data' lazem baraye 'add to cart' ro ba 'FormData' be 'backend' befrestim.
      const formData = new FormData();

      formData.append("cart_id", cartID);
      formData.append("product_id", product_id);
      formData.append("user_id", userData?.user_id);
      formData.append("product_price", price);
      formData.append("product_shipping_amount", shipping_amount);
      formData.append("quantity", quantityInput);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("country", currentAddress.country);

      const response = await axiosAPIInstance.post("cart/", formData);
      // console.log(response.data);
      Toast.fire({
        icon: "success",
        title: response.data.message,
      });
      fetchCartData(cartID, userData?.user_id);
      fetchCartDetail(cartID, userData?.user_id);
    } catch (error) {
      // console.log(error);
      Swal.fire({
        icon: "error",
        title: response.data.message,
      });
    }
  };

  const handleDeleteCartItemClick = async (itemID) => {
    const url = UserData?.user_id
      ? `cart-delete/${cartID}/${itemID}/${UserData?.user_id}/`
      : `cart-delete/${cartID}/${itemID}/`;

    try {
      await axiosAPIInstance.delete(url);

      Toast.fire({
        icon: "success",
        title: "Item Removed From Cart Successfully",
      });

      fetchCartData(cartID, userData?.user_id);
      fetchCartDetail(cartID, userData?.user_id);
    } catch (error) {
      // console.log(error);
      Swal.fire({
        icon: "error",
        title: response.data.message,
      });
    }
  };

  const handleOrderPersonalInformationFormOnChange = (event) => {
    setOrderPersonalInformationForm((prevInformation) => ({
      ...prevInformation,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCreateOrder = async () => {
    if (
      !orderPersonalInformationForm?.fullName ||
      !orderPersonalInformationForm?.mobile ||
      !orderPersonalInformationForm?.email ||
      !orderPersonalInformationForm?.address ||
      !orderPersonalInformationForm?.city ||
      !orderPersonalInformationForm?.state ||
      !orderPersonalInformationForm?.country
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields!",
        text: "All fields are required before checkout!",
      });
    } else {
      const formData = new FormData();

      formData.append("full_name", orderPersonalInformationForm?.fullName);
      formData.append("email", orderPersonalInformationForm?.email);
      formData.append("mobile", orderPersonalInformationForm?.mobile);
      formData.append("address", orderPersonalInformationForm?.address);
      formData.append("city", orderPersonalInformationForm?.city);
      formData.append("country", orderPersonalInformationForm?.country);
      formData.append("state", orderPersonalInformationForm?.state);
      formData.append("cart_id", cartID);
      formData.append("user_id", userData ? userData?.user_id : 0);

      const response = await axiosAPIInstance.post("create-order/", formData);
      console.log(response);
    }
  };

  //! useEffect

  useEffect(() => {
    const initialQuantities = {};

    cartData.forEach((cart) => {
      initialQuantities[cart?.product.id] = cart.quantity;
    });

    setProductQuantity(initialQuantities);
  }, [cartData]);

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
                              <span>{cart.product.vendor.name}</span>
                            </p>
                            <p className="mt-3">
                              <button
                                onClick={() =>
                                  handleDeleteCartItemClick(cart.id)
                                }
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
                                  onChange={(event) =>
                                    handleQuantityChange(event, cart.product.id)
                                  }
                                  value={
                                    productQuantity[cart.product.id] ||
                                    cart.quantity
                                  }
                                  min={1}
                                  max={cart.product.stock_quantity}
                                />
                              </div>
                              <button
                                onClick={() =>
                                  handleUpdateCartOnClick(
                                    cart.product.id,
                                    cart.product.price,
                                    cart.product.shipping_amount,
                                    cart.color,
                                    cart.size
                                  )
                                }
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
                    </section>
                    {cartData.length < 1 ? (
                      <>
                        <h5>Your Cart Is Empty</h5>
                        <Link to="/">
                          <i className="fas fa-shopping-cart"></i> Continue
                          Shopping
                        </Link>
                      </>
                    ) : (
                      <>
                        {/* Personal Information */}
                        <div>
                          <h5 className="mb-4 mt-4">Personal Information</h5>
                          {/* 2 column grid layout with text inputs for the first and last names */}
                          <div className="row mb-4">
                            <div className="col">
                              <div className="form-outline">
                                <label
                                  className="form-label"
                                  htmlFor="full_name"
                                >
                                  <i className="fas fa-user"></i> Full Name
                                </label>
                                <input
                                  type="text"
                                  id=""
                                  name="fullName"
                                  onChange={
                                    handleOrderPersonalInformationFormOnChange
                                  }
                                  value={
                                    orderPersonalInformationForm?.fullName ?? ""
                                  }
                                  className="form-control"
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
                                  onChange={
                                    handleOrderPersonalInformationFormOnChange
                                  }
                                  value={
                                    orderPersonalInformationForm?.email ?? ""
                                  }
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
                                  onChange={
                                    handleOrderPersonalInformationFormOnChange
                                  }
                                  value={
                                    orderPersonalInformationForm?.mobile ?? ""
                                  }
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
                                  onChange={
                                    handleOrderPersonalInformationFormOnChange
                                  }
                                  value={
                                    orderPersonalInformationForm?.address ?? ""
                                  }
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
                                  onChange={
                                    handleOrderPersonalInformationFormOnChange
                                  }
                                  value={
                                    orderPersonalInformationForm?.city ?? ""
                                  }
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
                                  onChange={
                                    handleOrderPersonalInformationFormOnChange
                                  }
                                  value={
                                    orderPersonalInformationForm?.state ?? ""
                                  }
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
                                  onChange={
                                    handleOrderPersonalInformationFormOnChange
                                  }
                                  value={
                                    orderPersonalInformationForm?.country ?? ""
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {/* Cart Details */}
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
                          onClick={handleCreateOrder}
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
