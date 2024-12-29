// libraries
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// API call functions
import axiosAPIInstance from "../../utils/axios";

function ProductDetail() {
  const [productData, setProductData] = useState({});
  // console.log(productData);

  /*
    ma inja mikhaim meghdar 'Quantity Color Size' ro ke 'user' baraye 'product' moshakhas mikone va 
    mikhad be 'cart' ezafe kone ro miaim inja dakhel 'state inputsValues' gharar midim.
    hala age 'user' bezane 'add to cart' ma miaim in data ro be 'Back-end' midim ta 'cart' besaze.
  */
  const [inputsValues, setInputsValues] = useState({
    color: "no color",
    size: "no size",
    quantity: 1,
  });
  // console.log(inputsValues);

  const params = useParams();
  // console.log(params.slug);

  const handelQuantityInputValueChange = (event) => {
    /*
      inja chon ma baraye 'quantity' yek 'input' darim nemishe az 'arrow functions handelColorSizeButtonsValuesClick'
      estefade kard va majburim yek 'arrow function' dige besazim baraye 'onChange input' marbut be 'quantity'.
    */
    setInputsValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handelColorSizeButtonsValuesClick = (event) => {
    /*
      inja dakhel in 'arrow function' ma mikhaim be 'button' har kodum az 'Color Size' biaim 'onClick' bedim va 
      in 'arrow function' ro bedim begim biad oun 'className qcs_button' ke dakhel 'button' dadim ro peida kone va 
      oun 'tag ya node' ke dakhelesh 'className qcs_name' dare ro be ma bede ke dar inja mishe oun 'tag input' ke 
      daghighan kenar 'tag button' vojud dare.
      bad az peida kardan oun 'tag input' miad 'state setInputsValues' ro seda mizane ta betunim ba estefade az 
      'name va value' oun 'input' ke peida kardim meghdar 'Color Size' dakhel 'state inputsValues' ro 
      moshakhas konim.
    */

    const colorInput = event.target
      /*
        dar inja 'closest(".qcs_button")' miad dar 'DOM' komak mikone ta avalin 'tag parent' ya hamun khod 'tag' ke 
        ba estefade az 'selector' ke dar inja manzur '.qcs_button' ast peida mikone.
      */
      .closest(".qcs_button")
      .parentNode.querySelector(".qcs_name");
    // console.log(colorInput);

    setInputsValues((prevState) => ({
      ...prevState,
      [colorInput.name]: colorInput.value,
    }));
  };

  useEffect(() => {
    axiosAPIInstance.get(`product/${params.slug}/`).then((response) => {
      setProductData(response.data);
    });
  }, []);

  return (
    <>
      <main className="mb-4 mt-4">
        <div className="container">
          {/* Section: Product details */}
          <section className="mb-9">
            <div className="row gx-lg-5">
              {/* Product Images */}
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="">
                  {/* Product Image */}
                  <div className="row gx-2 gx-lg-3">
                    <div className="col-12 col-lg-12">
                      <div className="lightbox">
                        <img
                          src={productData.image}
                          style={{
                            width: "100%",
                            height: 500,
                            objectFit: "cover",
                            borderRadius: 10,
                          }}
                          alt="Gallery image 1"
                          className="ecommerce-gallery-main-img active w-100 rounded-4"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Gallery images */}
                  <div className="mt-3 d-flex">
                    {/* 
                      dalil in ke inja oumadim az '?' estefade kardim ine ke zamani ke 'html' avalie bala miad ya hamun 'initialization'
                      anjam mishe 'productData object' khalie va 'chizi tush nist' pas vaghti migim 'productData.galleries' be ma 'error'
                      'undefined' neshun mide pas miaim migim 'productData.galleries?.map' yani har vaghti ke shart bar gharar bud
                      bia 'map' bezan.
                    */}
                    {productData.galleries?.map((gallery, index) => (
                      <div className="p-3" key={index}>
                        <img
                          src={gallery.image}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "cover",
                            borderRadius: 10,
                          }}
                          alt={`Gallery image ${index + 1}`}
                          className="ecommerce-gallery-main-img active w-100 rounded-4"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Product Details */}
              <div className="col-md-6 mb-4 mb-md-0">
                <div>
                  <h1 className="fw-bold mb-3">{productData.name}</h1>
                  {/* Product Rating */}
                  <div className="d-flex text-primary just align-items-center">
                    <ul
                      className="mb-3 d-flex p-0"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <i
                          className="fas fa-star fa-sm text-warning ps-0"
                          title="Bad"
                        />
                        <i
                          className="fas fa-star fa-sm text-warning ps-0"
                          title="Bad"
                        />
                        <i
                          className="fas fa-star fa-sm text-warning ps-0"
                          title="Bad"
                        />
                        <i
                          className="fas fa-star fa-sm text-warning ps-0"
                          title="Bad"
                        />
                        <i
                          className="fas fa-star fa-sm text-warning ps-0"
                          title="Bad"
                        />
                      </li>

                      <li style={{ marginLeft: 10, fontSize: 13 }}>
                        <a href="" className="text-decoration-none">
                          <strong className="me-2">4/5</strong>(2 reviews)
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* Product Prices */}
                  <h5 className="mb-3">
                    <s className="text-muted me-2 small align-middle">
                      ${productData.old_price}
                    </s>
                    <span className="align-middle">${productData.price}</span>
                  </h5>
                  {/* Product Description */}
                  <p className="text-muted">{productData.description}</p>
                  {/* Category & Specification */}
                  <div className="table-responsive">
                    <table className="table table-sm table-borderless mb-0">
                      <tbody>
                        {/* Product Category */}
                        <tr>
                          <th className="ps-0 w-25" scope="row">
                            <strong>Category</strong>
                          </th>
                          <td>{productData.category?.title}</td>
                        </tr>
                        {/* Product Specification */}
                        {productData.specifications?.map(
                          (specification, index) => (
                            <tr key={index}>
                              <th className="ps-0 w-25" scope="row">
                                <strong>{specification.title}</strong>
                              </th>
                              <td>{specification.content}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                  <hr className="my-5" />
                  {/* Quantity & Color & Size */}
                  <div>
                    <div className="row flex-column">
                      {/* Product Quantity */}
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="typeNumber">
                            <b>Quantity</b>
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            id="typeNumber"
                            className="form-control quantity"
                            min={1}
                            value={inputsValues.quantity}
                            onChange={handelQuantityInputValueChange}
                          />
                        </div>
                      </div>
                      {/* Product Size */}
                      {productData.sizes?.length > 0 && (
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="typeNumber">
                              <b>Size:</b> <span>{inputsValues.size}</span>
                            </label>
                          </div>
                          <div className="d-flex">
                            {productData.sizes?.map((size, index) => (
                              <div className="me-2" key={index}>
                                <input
                                  type="hidden"
                                  className="qcs_name"
                                  name="size"
                                  value={size.name}
                                />
                                <button
                                  className="btn btn-secondary qcs_button"
                                  onClick={handelColorSizeButtonsValuesClick}
                                >
                                  {size.name}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Product Color */}
                      {productData.colors?.length > 0 && (
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="typeNumber">
                              <b>Color:</b> <span>{inputsValues.color}</span>
                            </label>
                          </div>
                          <div className="d-flex">
                            {productData.colors?.map((color, index) => (
                              <div key={index}>
                                <input
                                  type="hidden"
                                  className="qcs_name"
                                  name="color"
                                  value={color.name}
                                />
                                <button
                                  className="btn p-3 me-2 qcs_button"
                                  style={{ background: color.color_code }}
                                  onClick={handelColorSizeButtonsValuesClick}
                                ></button>
                              </div>
                            ))}
                          </div>
                          <hr />
                        </div>
                      )}
                    </div>
                    {/* Add To Cart */}
                    <button
                      type="button"
                      className="btn btn-primary btn-rounded me-2"
                    >
                      <i className="fas fa-cart-plus me-2" /> Add to cart
                    </button>
                    {/* WishList */}
                    <button
                      href="#!"
                      type="button"
                      className="btn btn-danger btn-floating"
                      data-mdb-toggle="tooltip"
                      title="Add to wishlist"
                    >
                      <i className="fas fa-heart" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <hr />
          {/* Specifications & Vendor & Review & Questions Tabs */}
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            {/* Specification Tab Link */}
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Specifications
              </button>
            </li>
            {/* Vendor Tab Link */}
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Vendor
              </button>
            </li>
            {/* Review Tab Link */}
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-contact-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-contact"
                type="button"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                Review
              </button>
            </li>
            {/* Question Tab Link */}
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-question-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-question"
                type="button"
                role="tab"
                aria-controls="pills-question"
                aria-selected="false"
              >
                Question
              </button>
            </li>
          </ul>
          {/* Specifications & Vendor & Review & Questions Tabs Contents */}
          <div className="tab-content" id="pills-tabContent">
            {/* Specification Tab Content */}
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabIndex={0}
            >
              <div className="table-responsive">
                <table className="table table-sm table-borderless mb-0">
                  <tbody>
                    {/* Product Category */}
                    <tr>
                      <th className="ps-0 w-25" scope="row">
                        <strong>Category</strong>
                      </th>
                      <td>{productData.category?.title}</td>
                    </tr>
                    {/* Product Specification */}
                    {productData.specifications?.map((specification, index) => (
                      <tr key={index}>
                        <th className="ps-0 w-25" scope="row">
                          <strong>{specification.title}</strong>
                        </th>
                        <td>{specification.content}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Vendor Tab Content */}
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabIndex={0}
            >
              <div className="card mb-3" style={{ maxWidth: 400 }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={productData.vendor?.image}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      alt="User Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{productData.vendor?.name}</h5>
                      <p className="card-text">
                        {productData.vendor?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Review Tab Content */}
            <div
              className="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
              tabIndex={0}
            >
              <div className="container mt-5">
                <div className="row">
                  {/* Column 1: Form to create a new review */}
                  <div className="col-md-6">
                    <h2>Create a New Review</h2>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          Rating
                        </label>
                        <select name="" className="form-select" id="">
                          <option value="1">1 Star</option>
                          <option value="1">2 Star</option>
                          <option value="1">3 Star</option>
                          <option value="1">4 Star</option>
                          <option value="1">5 Star</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="reviewText" className="form-label">
                          Review
                        </label>
                        <textarea
                          className="form-control"
                          id="reviewText"
                          rows={4}
                          placeholder="Write your review"
                          defaultValue={""}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit Review
                      </button>
                    </form>
                  </div>
                  {/* Column 2: Display existing reviews */}
                  <div className="col-md-6">
                    <h2>Existing Reviews</h2>
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-3">
                          <img
                            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                            alt="User Image"
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-md-9">
                          <div className="card-body">
                            <h5 className="card-title">User 1</h5>
                            <p className="card-text">August 10, 2023</p>
                            <p className="card-text">
                              This is a great product! I'm really satisfied with
                              it.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-3">
                          <img
                            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                            alt="User Image"
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-md-9">
                          <div className="card-body">
                            <h5 className="card-title">User 2</h5>
                            <p className="card-text">August 15, 2023</p>
                            <p className="card-text">
                              The quality of this product exceeded my
                              expectations!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* More reviews can be added here */}
                  </div>
                </div>
              </div>
            </div>
            {/* Question Tab Content */}
            <div
              className="tab-pane fade"
              id="pills-question"
              role="tabpanel"
              aria-labelledby="pills-question-tab"
              tabIndex={0}
            >
              <div className="container mt-5">
                <div className="row">
                  {/* Column 1: Form to submit new questions */}
                  <div className="col-md-6">
                    <h2>Ask a Question</h2>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="askerName" className="form-label">
                          Your Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="askerName"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="questionText" className="form-label">
                          Question
                        </label>
                        <textarea
                          className="form-control"
                          id="questionText"
                          rows={4}
                          placeholder="Ask your question"
                          defaultValue={""}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit Question
                      </button>
                    </form>
                  </div>
                  {/* Column 2: Display existing questions and answers */}
                  <div className="col-md-6">
                    <h2>Questions and Answers</h2>
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">User 1</h5>
                        <p className="card-text">August 10, 2023</p>
                        <p className="card-text">
                          What are the available payment methods?
                        </p>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Answer:
                        </h6>
                        <p className="card-text">
                          We accept credit/debit cards and PayPal as payment
                          methods.
                        </p>
                      </div>
                    </div>
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">User 2</h5>
                        <p className="card-text">August 15, 2023</p>
                        <p className="card-text">
                          How long does shipping take?
                        </p>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Answer:
                        </h6>
                        <p className="card-text">
                          Shipping usually takes 3-5 business days within the
                          US.
                        </p>
                      </div>
                    </div>
                    {/* More questions and answers can be added here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductDetail;
