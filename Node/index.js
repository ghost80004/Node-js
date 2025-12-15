const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const mydata = [{ id: 1, name: "Ankit", age: 20 }];
app.get("/student", (req, res) => {
  res.status(200).json({ message: "Get All Successfully", data: mydata });
});
app.get("/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const find = mydata.find((s) => s.id === id);
  if (!find) {
    return res.status(404).json({ message: "Data nahi Haiiii" });
  }
  res.status(200).json({ message: "Get Successfully", data: find });
});
app.post("/studentpost", (req, res) => {
  const { name, age } = req.body;
  const newdata = {
    id: mydata.length + 1,
    name,
    age: parseInt(age),
  };
  mydata.push(newdata);
  res.status(201).json({ message: "Post Successfully", data: newdata });
});
app.put("/studentupdate/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;
  const find = mydata.find((s) => s.id === id);
  if (!find) {
    return res.status(404).json({ message: "Data nahi Haiiii" });
  }
  find.name = name ;
  find.age = age ;
  res.status(201).json({ message: "Update Succesfully", data: find });
});

app.listen(5000, () => {
  console.log("Server Is Runing");
});
