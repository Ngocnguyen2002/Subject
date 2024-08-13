import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PayPalPayment(props) {

  const { handlePayment } = props
  const navigate = useNavigate();

  const initialOptions = {
    clientId:
      "AfYToC6DHtj7SjTIw9U53WnUB8-ndpxX7LZJKYWl4LfVxyY1T3W0Ud0uMcAYB6zbY0peaduRZPtjb9so",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/paypal/my-server/create-paypal-order", 
        {
          product: {
            description: "Thanh toán qua PayPal",
            price: "101.00",
          },
        }
      )
      console.log(response)

      const orderData = response.data

      console.log(39, orderData , orderData.id)
      if (!orderData.id) {
        throw new Error("Unexpected error occurred, please try again.");
      }

      return orderData.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove = async (data) => {
    // Capture the funds from the transaction.
    const response = await fetch("http://localhost:8080/api/paypal/my-server/capture-paypal-order", {
      method: "POST",
      body: JSON.stringify({
        orderID: data.id,
      }),
    });

    const details = response;
    // Show success message to buyer
    handlePayment()
    alert(`Thanh toán thành công bởi PayPal `);
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
}

export default PayPalPayment;
