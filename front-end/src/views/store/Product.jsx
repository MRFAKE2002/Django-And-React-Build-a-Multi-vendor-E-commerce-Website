// libraries
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// API call functions
import axiosAPIInstance from "../../utils/axios";

// Plugin functions
import GetCurrentAddress from "../plugin/UserCountry";
import CartID from "../plugin/CartID";
import UserData from "../plugin/UserData";

// sakht tanzimat sweetalert2
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

function Product() {
  //! Custom States

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  /*
    ma inja mikhaim meghdar 'Quantity Color Size' ro ke 'user' baraye 'product' moshakhas mikone va 
    mikhad be 'cart' ezafe kone ro miaim inja dakhel 'state inputsValues' gharar midim.
    hala age 'user' bezane 'add to cart' ma miaim in data ro be 'Back-end' midim ta 'cart' besaze.
  */
  const [productValues, setProductValues] = useState({});

  /*
    alan inja mikhaim 'address user' ro ba estefade az 'function GetCurrentAddress' begirim va dar in 'state' gharar bedim.
  */
  const currentAddress = GetCurrentAddress();
  // console.log('address:', currentAddress);

  // ma inja ba estefade az in 'plugin' mitunim vase 'cart' biaim 'id' besazim va dar 'localStorage' zakhire konim.
  const cartID = CartID();
  // console.log(cartID);

  // inja ma miaim oun 'refresh_token' age dakhel 'cookie' bud 'decode' mikone va 'data' male 'user' ro mide.
  const userData = UserData();
  // console.log(userData);

  //! Custom Functions

  //? const handleProductValuesButtonClick = (event) => {
  //?   /*
  //?     'logic in code' baraye zamani ke bekhaim az yek 'product' betune chand ta 'size va color' entekhab bokone
  //?     dar in function ma mikhaim 'data' male 'product' ro ke 'user' mikhad be 'cart' befreste, begirim va dakhel yek 'state'
  //?     gharar bedim. hala miaim az 'button' oun 'productID va oun name va value' ro migirim ta dakhel 'state' bezarim.
  //?     inja dalil estefade az 'currentTarget' bejaye 'target' ine ke momkene dakhel 'button' yek 'tag' dige mesl 'span'
  //?     vojud dashte bashe va 'event.target' momkene be oun 'tag' dakhel 'button' eshare kone baraye hamin miaim 'currentTarget'
  //?     mizanim ke faghat be 'button' eshare kone.
  //?   */
  //?   const productID = event.currentTarget.getAttribute("data-product-id");

  //?   // inja momkene 'name' meghdar 'color ya size ya quantity' bashe.
  //?   const name = event.currentTarget.name;

  //?   // inja mishe oun meghdar entekhab shode.
  //?   const value = event.currentTarget.innerHTML;

  //?   // gereftan 'color code' az 'style button'
  //?  const colorCode = event.currentTarget.style.backgroundColor;

  //?   // age productID vojud nadasht kari nakone.
  //?   if (!productID) return;

  //?   setProductValues((prevValues) => ({
  //?     ...prevValues,
  //?     [productID]: {

  //?       // 'data' ghabli ke dakhelesh bud
  //?       ...prevValues[productID],

  //?       // migim age oun 'name' mesl 'size ya color ya quantity' dakhel 'data' in 'productID' hast ya na.
  //?       [name]: prevValues[productID]?.[name]

  //?         /*
  //?         agar 'bud' ke bia aval 'data' ghabli ro gharar bede badesh age 'name' barabar 'color' bud bia 'colorCode' ro
  //?        bede age 'size' bud bia meghdar 'value' ro bezar
  //?         */
  //?         ? [...prevValues[productID][name], name === "color" ? colorCode : value]

  //?         // age aslan 'meghdari' az ghabl dakhel in 'name' nabud bia meghdar jadid bede.
  //?         : [name === "color" ? colorCode : value],
  //?     },
  //?   }));
  //? };
  //? console.log(productValues);
  //? /*
  //?   "1": {
  //?     "size": ["XL", "L"],
  //?     "color": ["red", "blue"]
  //?   },
  //?   "2": {
  //?     "size": ["M"],
  //?     "color": ["green", "yellow"]
  //?   }
  //? }
  //? */

  const handleProductValuesButtonClick = (event) => {
    /*
      dar in function ma mikhaim 'data' male 'product' ro ke 'user' mikhad be 'cart' befreste, begirim va dakhel yek 'state'
      gharar bedim. hala miaim az 'button' oun 'productID va oun name va value' ro migirim ta dakhel 'state' bezarim.
      inja dalil estefade az 'currentTarget' bejaye 'target' ine ke momkene dakhel 'button' yek 'tag' dige mesl 'span'
      vojud dashte bashe va 'event.target' momkene be oun 'tag' dakhel 'button' eshare kone baraye hamin miaim 'currentTarget'
      mizanim ke faghat be 'button' eshare kone.
     */
    const productID = event.currentTarget.getAttribute("data-product-id");
    const name = event.currentTarget.name; // گرفتن نام (مثل color یا size)

    if (!productID) return;

    const value =
      name === "color"
        ? event.currentTarget.getAttribute("data-color-name")
        : event.currentTarget.innerHTML;

    setProductValues((prevValues) => ({
      ...prevValues,
      [productID]: {
        ...prevValues[productID],
        [name]: value,
      },
    }));
  };

  // Handle quantity change from input
  const handleProductQuantityOnChange = (event) => {
    const productID = event.currentTarget.getAttribute("data-product-id");
    const value = event.target.value;

    // Update the quantity in state for the specific product
    setProductValues((prevValues) => ({
      ...prevValues,
      [productID]: {
        ...prevValues[productID], // Preserve previous values of the product
        quantity: value, // Update quantity
      },
    }));
  };

  /*
    console.log(productValues);
    {
      "1": {
        "size": "XL",
        "color": "rgb(255, 0, 0)"
      },
      "2": {
        "size": "M",
        "color": "rgb(0, 128, 0)"
      }
    }
  */

  const handleAddToCart = async (product_id, price, shipping_amount) => {
    // console.log('cart id:', cartID);
    // console.log('product id:', product_id);
    // console.log("user id", userData?.user_id);
    // console.log('product price:', price);
    // console.log('product shipping amount:', shipping_amount);
    // console.log("quantity", productValues[product_id].quantity);
    // console.log("size", productValues[product_id].size);
    // console.log("color", productValues[product_id].color);
    // console.log('country:', currentAddress.country);

    try {
      // hala mikhaim 'data' lazem baraye 'add to cart' ro ba 'FormData' be 'backend' befrestim.
      const formData = new FormData();

      formData.append("cart_id", cartID);
      formData.append("product_id", product_id);
      formData.append("user_id", userData?.user_id);
      formData.append("product_price", price);
      formData.append("product_shipping_amount", shipping_amount);
      formData.append("quantity", productValues[product_id].quantity);
      formData.append("size", productValues[product_id].size);
      formData.append("color", productValues[product_id].color);
      formData.append("country", currentAddress.country);

      const response = await axiosAPIInstance.post("cart/", formData);
      console.log(response.data);
      Toast.fire({
        icon: "success",
        title: response.data.message,
      });
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        title: response.data.message,
      });
    }
  };

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

  //! JSX

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
                      <Link to={`/detail/${product.slug}`}>
                        <img
                          src={product.image}
                          className="w-100"
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
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
                      <Link
                        to={`detail/${product.slug}/`}
                        className="text-reset"
                      >
                        <h5 className="card-title mb-3">{product.name}</h5>
                      </Link>
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
                              <b>Product Amount</b>: {product.stock_quantity}
                            </li>
                            <div className="p-1 mt-0 pt-0 d-block">
                              <li key={index}>
                                <input
                                  type="number"
                                  data-product-id={product.id}
                                  name="quantity"
                                  min="1"
                                  max={product.stock_quantity}
                                  value={
                                    productValues[product.id]?.quantity || 0
                                  }
                                  className="form-control block"
                                  onChange={handleProductQuantityOnChange}
                                />
                              </li>
                            </div>
                          </div>
                          {product.sizes?.length > 0 && (
                            <div className="d-flex flex-column">
                              <li className="p-1">
                                <b>Size</b>:{" "}
                                {productValues[product.id]?.size || "No Size"}
                              </li>
                              <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                {product.sizes?.map((size, index) => (
                                  <li key={index}>
                                    <button
                                      name="size"
                                      data-product-id={product.id}
                                      className="btn btn-secondary btn-sm me-2 mb-1"
                                      onClick={handleProductValuesButtonClick}
                                    >
                                      {size.name}
                                    </button>
                                  </li>
                                ))}
                              </div>
                            </div>
                          )}
                          {product.colors?.length > 0 && (
                            <div className="d-flex flex-column mt-3">
                              <li className="p-1">
                                <b>COlor</b>:{" "}
                                {productValues[product.id]?.color || "No Color"}
                              </li>
                              <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                                {product.colors?.map((color, index) => (
                                  <li key={index}>
                                    <button
                                      className="btn btn-sm me-2 mb-1 p-3"
                                      name="color"
                                      data-color-name={color.name}
                                      data-product-id={product.id}
                                      style={{
                                        backgroundColor: `${color.color_code}`,
                                      }}
                                      onClick={handleProductValuesButtonClick}
                                    />
                                  </li>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="d-flex mt-3 p-1">
                            <button
                              type="button"
                              className="btn btn-primary me-1 mb-1"
                              onClick={() =>
                                handleAddToCart(
                                  product.id,
                                  product.price,
                                  product.shipping_amount
                                )
                              }
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
                  <div className="col-lg-2" key={index}>
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
