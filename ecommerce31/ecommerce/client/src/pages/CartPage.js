import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import PayPalPayment from "./PayPalPayment";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [valueOption, setValueOption] = useState(1);
  const [priceVNPay, setPriceVNPay] = useState(0);

  //total price
  let total = 0;
  const totalPrice = () => {
    try {
      total = 0
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://localhost:8080/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Thanh toán hoàn tất ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };



  const createOrderMomo = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/momo/create_order',{
        total : total
      });
      handlePayment()
      window.open(res.data.payUrl, "_blank");
    } catch (error) {
      console.log(error)
    }
  }
  const createOrderVNpay = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/vnpay/create_order',{
        total : total
      });
      handlePayment()
      window.open(res.data.vnpUrl, "_blank");
    } catch (error) {
      console.log(error)
    }
  }

  const createOrderZalo = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/zalo/create_order', {
        total : total
      });
      handlePayment()
      console.log(res)
      window.open(res.data.order_url, "_blank");
    } catch (error) {
      console.log(error)
    }
  }
  const CodPaymentButton = () => (
    <button className="btn btn-primary" onClick={() => {handlePayment()}}>
      Đặt hàng{" "}
    </button>
  );
  const PayPalPaymentButton = () => <PayPalPayment handlePayment= {() => {handlePayment()}} />;

  const MomoPayButton = () => (
    <button className="btn btn-primary" onClick={() => {createOrderMomo()}}>
      Momo{" "}
    </button>
  );
  const VNPayPayButton = () => (
    <button className="btn btn-primary" onClick={() => {createOrderVNpay()}}>
      VNPay{" "}
    </button>
  );

  const ZaloPayButton = () => (
    <button className="btn btn-primary" onClick={() => {createOrderZalo()}}>
      ZaloPay{" "}
    </button>
  );


  const buttons = [
    CodPaymentButton,
    VNPayPayButton,
    MomoPayButton,
    ZaloPayButton,
  ];
  const paymentComponents = {
    1: CodPaymentButton,
    2: VNPayPayButton,
    3: MomoPayButton,
    4: ZaloPayButton,
  };
  const PaymentComponent = paymentComponents[valueOption];

  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Myskin chào mừng bạn ghé thăm"
                : `Xin chào ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `Bạn có ${cart.length} sản phẩm trong giỏ hàng ${auth?.token ? "" : "Vui lòng đăng nhập để thanh toán !"
                  }`
                  : " Giỏ hàng trống "}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Giá : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Loại bỏ
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary ">
              <h2>Giỏ hàng</h2>
              <p>Tổng cộng | Thủ tục thanh toán | Thanh toán</p>
              <hr />
              <h4>Tổng : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Địa chỉ hiện tại</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Cập nhật địa chỉ
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Cập nhật địa chỉ
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Vui lòng đăng nhập để thanh toán
                    </button>
                  )}
                </div>
              )}
              <select className="form-select" aria-label="Default select example" onChange={(e) => setValueOption(e.target.value)}>
                <option value= {1} selected>Thanh toán khi nhận hàng</option>
                <option value={2}>Thanh toán bằng VNpay</option>
                <option value={3}>Thanh toán bằng Momo</option>
                <option value={4}>Thanh toán bằng ZaloPay</option>
              </select>
              <div className="mt-2">
                {/* {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />


                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Đang xử lý ...." : "Thực hiện thanh toán"}
                    </button>
                  </>
                )} */}
                {PaymentComponent && <PaymentComponent />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
