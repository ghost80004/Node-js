const mongoose = require("mongoose");
exports.DB = () => {
  try {
    mongoose
      .connect("mongodb://localhost:27017/todolist")
      .then(() => console.log("DB is Connected "))
      .catch((err) => console.log("DB Error", err));
  } catch (err) {
    console.error("Db Error", err);
  }
};
