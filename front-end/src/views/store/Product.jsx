// libraries
import React, { useEffect, useState } from "react";

// API call functions
import axiosAPIInstance from "../../utils/axios";

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosAPIInstance.get("products/").then((response) => {
      // ma inja miaim 'data product' ro be surat 'object' kamel dakhel 'list state products' mizarim.
      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    axiosAPIInstance.get("categories/").then((response) => {
      // ma inja miaim 'data product' ro be surat 'object' kamel dakhel 'list state products' mizarim.
      setCategories(response.data);
    });
  }, []);

  return (
    <>
      <main className="mt-5">
        <div className="container">
          <section className="text-center">
            <div className="row">
              {/* Products List */}
              {products.map((product, index) => (
                <div className="col-lg-4 col-md-12 mb-4" key={index}>
                  <div className="card">
                    <div
                      className="bg-image hover-zoom ripple"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src={product.image}
                        className="w-100"
                        style={{
                          width: "100%",
                          height: "auto",
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
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          />
                        </div>
                      </a>
                    </div>
                    <div className="card-body">
                      <a href="" className="text-reset">
                        <h5 className="card-title mb-3">{product.name}</h5>
                      </a>
                      <a href="" className="text-reset">
                        <p>{product?.category.title}</p>
                      </a>
                      <div className="d-flex justify-content-center">
                        <h6 className="mb-3 me-2">${product.price}</h6>
                        <h6 className="mb-3">
                          <strike>${product.old_price}</strike>
                        </h6>
                      </div>
                      <div className="btn-group">
                        <button
                          className="btn btn-primary dropdown-toggle"
                          type="button"
                          id="dropdownMenuClickable"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="false"
                          aria-expanded="false"
                        >
                          Variation
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuClickable"
                        >
                          <div className="d-flex flex-column">
                            <li className="p-1">
                              <b>Size</b>: XL
                            </li>
                            <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                              <li>
                                <button className="btn btn-secondary btn-sm me-2 mb-1">
                                  XXL
                                </button>
                              </li>
                              <li>
                                <button className="btn btn-secondary btn-sm me-2 mb-1">
                                  XXL
                                </button>
                              </li>
                              <li>
                                <button className="btn btn-secondary btn-sm me-2 mb-1">
                                  XXL
                                </button>
                              </li>
                            </div>
                          </div>
                          <div className="d-flex flex-column mt-3">
                            <li className="p-1">
                              <b>COlor</b>: Red
                            </li>
                            <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                              <li>
                                <button
                                  className="btn btn-sm me-2 mb-1 p-3"
                                  style={{ backgroundColor: "red" }}
                                />
                              </li>
                              <li>
                                <button
                                  className="btn btn-sm me-2 mb-1 p-3"
                                  style={{ backgroundColor: "green" }}
                                />
                              </li>
                              <li>
                                <button
                                  className="btn btn-sm me-2 mb-1 p-3"
                                  style={{ backgroundColor: "yellow" }}
                                />
                              </li>
                            </div>
                          </div>
                          <div className="d-flex mt-3 p-1">
                            <button
                              type="button"
                              className="btn btn-primary me-1 mb-1"
                            >
                              <i className="fas fa-shopping-cart" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger px-3 me-1 mb-1 ms-2"
                            >
                              <i className="fas fa-heart" />
                            </button>
                          </div>
                        </ul>
                        <button
                          type="button"
                          className="btn btn-danger px-3 me-1 ms-2"
                        >
                          <i className="fas fa-heart" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Categories List */}
              <div className="row">
                {categories.map((category, index) => (
                  <div className="col-lg-2">
                    <img
                      src={category?.image}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                    <h6>{category.title}</h6>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/*Section: Wishlist*/}
        </div>
      </main>
    </>
  );
}

export default Product;
