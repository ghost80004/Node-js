const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

app.use("/api/movies", movieRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
