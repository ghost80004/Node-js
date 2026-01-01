const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const otpRoutes = require("./routes/otpRoutes");


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/otp", otpRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/movie", require("./routes/movieRoutes"));
app.use("/api/review", require("./routes/reviewRoutes"));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
