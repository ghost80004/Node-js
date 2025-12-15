const express = require("express");
const dotenv = require("dotenv")
dotenv.config();
const {connectDB} = require("./config/db");
const otpRouter = require("./routes/otpRouter")
const userRoutes = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes.js")
const cookieParser = require("cookie-parser")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



connectDB();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/otp",otpRouter)

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});
