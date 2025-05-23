// Libraries
import React, { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Swal from "sweetalert2";

// Style
import "../style/InvoiceStyle.css";

// API Function
import axiosAPIInstance from "../../utils/axios";

// Plugin
import UserData from "../plugin/UserData";

// sakht tanzimat sweetalert2
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

function Invoice() {
  //! Custom State

  const [order, setOrder] = useState([]);
  // console.log(order);

  const [orderItems, setOrderItems] = useState([]);
  // console.log(orderItems);
  
  const [printKey, setPrintKey] = useState(0);
  console.log(printKey);

  //! Custom Hooks

  const userData = UserData();
  console.log(userData);

  const param = useParams();
  // console.log(param);

  const navigate = useNavigate();

  const location = useLocation();

  //! Custom Functions

  const printDiv = (divId) => {
    const printContents = document.getElementById(divId)?.innerHTML;
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    window.location.reload();
  };

  //! useEffect
  useEffect(() => {
    if (!userData?.user_id || !param?.order_oid) {
      navigate("/login", {
        state: { from: location?.pathname },
        replace: true,
      });
      return; // برای جلوگیری از ادامه اجرا
    }

    axiosAPIInstance
      .get(`customer/order/detail/${userData?.user_id}/${param?.order_oid}/`)
      .then((response) => {
        setOrder(response.data);
        setOrderItems(response.data.order_items);
      })
      .catch((error) => {
        <Navigate to="/login" />;
      });
  }, [param]);


  return (
    <div>
      <>
        <div className="row d-flex justify-content-center p-2">
          <div className="receipt-main col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
            <div id="printDiv">
              <div className="d-flex justify-content-between">
                <div className="row">
                  <div className="receipt-header">
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="receipt-left">
                        <img
                          className="img-responsive"
                          alt="iamgurdeeposahan"
                          src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"
                          style={{ width: 71, borderRadius: 43 }}
                        />
                      </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 text-left">
                      <div className="receipt-right">
                        <h5 className="margin-top-10">
                          {order?.buyer?.fullname}
                          <span className="text-warning">.</span>
                        </h5>
                        <p>
                          <i className="fa fa-phone" /> {order?.buyer?.phone}
                        </p>
                        <p>
                          <i className="fa fa-envelope" /> {order?.buyer?.email}
                        </p>
                        <p>
                          <i className="fa fa-location-arrow" />{" "}
                          {order?.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="receipt-header receipt-header-mid">
                    <div className="col-xs-12 col-sm-12 col-md-12 text-left">
                      <div className="receipt-right">
                        <h5>Customer Details</h5>
                        <p>
                          <b>
                            <i className="fa fa-user" />
                          </b>
                          {order.full_name}
                        </p>
                        <p>
                          <b>
                            <i className="fa fa-envelope" />
                          </b>
                          {order.email}
                        </p>
                        <p>
                          <b>
                            <i className="fa fa-phone" />
                          </b>
                          {order.mobile}
                        </p>
                      </div>
                    </div>
                    <br />
                    <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="receipt-left">
                        <h6>INVOICE ID #{order.oid}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Sub Total</th>
                      <th>Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((order, index) => (
                      <tr key={index}>
                        <td className="col-md-5">{order?.product?.name}</td>
                        <td className="col-md-2">${order?.price}</td>
                        <td className="col-md-2">${order?.quantity}</td>
                        <td className="col-md-2">${order?.sub_total}</td>
                        <td className="col-md-2 text-red">-${order?.saved || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-start"></div>
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-end">
                    <div className="receipt-right">
                      <h5>Summary</h5>
                      <p className="mb-2">
                        <b>Sub Total: </b>${order.sub_total}
                      </p>
                      <p className="mb-2">
                        <b>Shipping: </b>${order.shipping_amount}
                      </p>
                      <p className="mb-2">
                        <b>Tax: </b>${order.tax_fee}
                      </p>
                      <p className="mb-2">
                        <b>Service Fee: </b>${order.service_fee}
                      </p>
                      <br />
                      <p className="mb-2">
                        <b>Total: </b>${order.total}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-center align-items-center">
              <button
                onClick={() => printDiv("printDiv")}
                id="printButton"
                className="btn btn-dark"
              >
                Print <i className="fas fa-print" />
              </button>
            </div>
          </div>
        </div>
        {/* Print Windows */}
      </>
    </div>
  );
}

export default Invoice;
