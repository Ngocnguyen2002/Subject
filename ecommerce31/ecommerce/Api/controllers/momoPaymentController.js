const axios = require("axios");
let crypto = require("crypto");
const moment = require("moment")
const querystring = require('qs');

function sortObject(obj) {
  const sortedKeys = Object.keys(obj).sort();

  const sortedObj = {};
  sortedKeys.forEach(key => {
    sortedObj[key] = obj[key];
  });

  return sortedObj;
}

exports.CreateOrder = async (req, res) => {
  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");
  let momoUrl = "https://test-payment.momo.vn"
  let redirectUrl = "http://localhost:3000/dashboard/user/orders"
  let orderInfo = "Thanh toán Momo"
  let orderId = moment(date).format("DDHHmmss");
  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = partnerCode + new Date().getTime();
  var ipnUrl = "http://localhost:3000/dashboard/user/orders";
  var amount = req.body.total || 10000;
  var requestType = "payWithMethod"
  var extraData = ""; 
  
  var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
  //signature
  var signature = crypto.createHmac('sha256', secretkey)
      .update(rawSignature)
      .digest('hex');
  
  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
      partnerCode : partnerCode,
      accessKey : accessKey,
      requestId : requestId,
      amount : amount,
      orderId : orderId,
      orderInfo : orderInfo,
      redirectUrl : redirectUrl,
      ipnUrl : ipnUrl,
      extraData : extraData,
      requestType : requestType,
      signature : signature,
      lang: 'en'
  });

  const options = {
    method: "POST",
    url:"https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    },
    data: requestBody
  }
  try {
    const result = await axios(options);

    return res.status(200).json(result.data)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
