// Libraries
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Plugin
import UserData from "../plugin/UserData";
import { addToWishlist } from "../plugin/AddToWishlist";

// API Function
import axiosAPIInstance from "../../utils/axios";

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

function Wishlist() {
  //! Custom State
  const [wishlist, setWishlist] = useState([]);

  //! Custom Hooks

  const userData = UserData();
  const navigate = useNavigate();
  const location = useLocation();

  //! Custom Functions

  const fetchWishlist = async () => {
    try {
      const response = await axiosAPIInstance.get(
        `customer/wishlist/${userData?.user_id}/`
      );
      setWishlist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToWishlist = async (product_id) => {
    try {
      await addToWishlist(product_id, userData?.user_id);
      fetchWishlist();
    } catch (error) {
      console.log(error);
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
    fetchWishlist();
  }, []);

  // console.log(wishlist);

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
                    <div className="container">
                      {/* Section: Summary */}
                      <section className="">
                        <div className="row">
                          <h3 className="mb-3">
                            <i className="fas fa-heart text-danger" /> Wishlist
                          </h3>
                          {wishlist?.map((wishlist, index) => (
                            <div
                              className="col-lg-4 col-md-12 mb-4"
                              key={index}
                            >
                              <div className="card">
                                <div
                                  className="bg-image hover-zoom ripple"
                                  data-mdb-ripple-color="light"
                                >
                                  <img
                                    src={wishlist.product.image}
                                    className="w-100"
                                    style={{
                                      width: "100px",
                                      height: "300px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  <a href="#!">
                                    <div className="mask">
                                      <div className="d-flex justify-content-start align-items-end h-100">
                                        <h5>
                                          <span className="badge badge-primary ms-2">
                                            New
                                          </span>
                                        </h5>
                                      </div>
                                    </div>
                                    <div className="hover-overlay">
                                      <div
                                        className="mask"
                                        style={{
                                          backgroundColor:
                                            "rgba(251, 251, 251, 0.15)",
                                        }}
                                      />
                                    </div>
                                  </a>
                                </div>
                                <div className="card-body">
                                  <a href="" className="text-reset">
                                    <h6 className="card-title mb-3 ">
                                      {wishlist?.product.name.slice(0, 30)}...
                                    </h6>
                                  </a>
                                  {/* <a href="" className="text-reset">
                                    <p>{wishlist.product?.brand.title}</p>
                                  </a> */}
                                  <h6 className="mb-3">
                                    {wishlist?.product.price}
                                  </h6>

                                  <button
                                    onClick={() =>
                                      handleAddToWishlist(wishlist.product.id)
                                    }
                                    type="button"
                                    className="btn btn-danger px-3 me-1 mb-1"
                                  >
                                    <i className="fas fa-heart" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                          {wishlist.length < 1 && (
                            <h6 className="container">
                              Your wishlist is Empty
                            </h6>
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

export default Wishlist;
