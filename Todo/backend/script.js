const express = require("express");
const cors = require("cors");
const { DB } = require("./db");
const Todos = require("./model");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// FIXED CORS
app.use(
  cors({
    origin: "http://localhost:5173",  // correct port
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


DB();

// ADD TODO
app.post("/add", async (req, res) => {
  try {
    const { todo } = req.body;

    if (!todo) {
      return res.status(400).json({ message: "Please Enter Task...." });
    }

    const exists = await Todos.findOne({ todo });

    if (exists) {
      return res.status(400).json({ message: "Enter Different Task" });
    }

    const newTodo = await Todos.create({ todo });

    res
      .status(200)
      .json({ success: true, message: "Task Add Successfully", newTodo });
  } catch (error) {
    res.status(404).json({ success: false, message: "Server Error...." });
  }
});

// GET TODOS
app.get("/get", async (req, res) => {
  const allTodo = await Todos.find();
  res.status(200).json({ success: true, allTodo });
});

// UPDATE TODO
app.put("/update/:id", async (req, res) => {
  try {
    const { todo } = req.body;
    const id = req.params.id;

    if (!todo) {
      return res.status(400).json({ message: "Task Not Found" });
    }

    const update = await Todos.findByIdAndUpdate(
      id,
      { todo },
      { new: true, runValidators: true }
    );

    if (!update) {
      return res.status(400).json({ message: "Update error" });
    }

    res.status(200).json({ success: true, message: "Update Successfully", update });
  } catch (error) {
    res.status(404).json({ success: false, message: "Server Error...." });
  }
});

// DELETE TODO
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletetodo = await Todos.findByIdAndDelete(id);

    if (!deletetodo) {
      return res.status(400).json({ message: "Delete error" });
    }

    res.status(200).json({
      success: true,
      message: "Delete Successfully",
      deletetodo,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Server Error...." });
  }
});

app.listen(5000, () => {
  console.log("===============================");
  console.log("Server Running on 5000");
  console.log("===============================");
});
