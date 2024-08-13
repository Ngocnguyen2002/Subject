const express = require('express')
var cors = require('cors');
const app = express();
const morgan = require("morgan")
const colors = require("colors")
const path = require('path');
const categoryRoutes = require("./routes/categoryRoutes.js")
const productRoutes = require("./routes/productRoutes.js")
const authRoutes = require("./routes/authRoute.js")
const momoRoutes = require("./routes/momoPaymentRoute.js")
const zaloRoutes = require("./routes/zaloPayPaymentRoute.js")
const paypalRoutes = require("./routes/paypalPayment.js")
const vnpayRoutes = require("./routes/vnPayPaymentRoute.js")
require('dotenv').config()
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/momo", momoRoutes);
app.use("/api/zalo", zaloRoutes);
app.use("/api/paypal", paypalRoutes);
app.use("/api/vnpay", vnpayRoutes);

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});


//localhost://8000/api/booking POST
//localhost://8000/api/sign-up