
const axios = require('axios')
const base = "https://api-m.sandbox.paypal.com"
const PAYPAL_CLIENT_ID = "AfYToC6DHtj7SjTIw9U53WnUB8-ndpxX7LZJKYWl4LfVxyY1T3W0Ud0uMcAYB6zbY0peaduRZPtjb9so"
const PAYPAL_CLIENT_SECRET =  "EINdfZ2Z74VlGFlnA2pfUzrSaCFpRj16ffs-j9nocc-Ehor64KVq5Hgh7oymNjHXKj0GZQ8k9uv4C2PH"
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    // const response = await fetch(`${base}/v1/oauth2/token`, {
    //   method: "POST",
    //   body: "grant_type=client_credentials",
    //   headers: {
    //     Authorization: `Basic ${auth}`,
    //   },
    // });
    const response = await axios({
      url: `${base}/v1/oauth2/token`,
      method: 'post',
      data: "grant_type=client_credentials",
      auth: {
        username: PAYPAL_CLIENT_ID,
        password: PAYPAL_CLIENT_SECRET
      }
    })

    return response.data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

exports.createOrder = async (req, res) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "110.00",
        },
      },
    ],
  };
  try {
    const response = await axios({
      url: url,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      data: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "10.00",
            },
          }
        ],

        application_context: {
          return_url: "http://localhost:3000/dashboard/user/orders",
          cancel_url: "http://localhost:3000/cart",
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
          brand_name: 'Test PayPal'
        }
      })
    })

    return res.status(200).json(response.data)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

exports.capturePayment = async (orderId) => {
  const accessToken = await generateAccessToken()
  try {
    const response = await axios({
      url: base + `/v2/checkout/orders/${orderId}/capture`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error);
    return;
  }
}