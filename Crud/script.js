const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const cors = require("cors")
// app.use(cors("http://localhost:5000/"))
const studentdata = [{ id: 1, name: "Ankit", age: 20 }];

app.get("/getdata", (req, res) => {
  res.send(studentdata);
});
app.get("/student/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const stu = studentdata.find((s) => s.id == id);
  if (!stu) {
    res.status(404).json({ message: "Student Not Found" });
  }
  res.status(201).json({ message: "Data add success ", data: stu });
});
app.post("/postdata", (req, res) => {
  const { name, age } = req.body;
  const student = {
    id: studentdata.length + 1,
    name,
    age: parseInt(age),
  };
  studentdata.push(student);
  res.status(201).json({ message: "Data add success ", data: student });
});

app.put("/putdata/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;
  const stu = studentdata.find((s) => s.id == id);
  if (!stu) {
    return res.status(404).json({ message: "Student Not Found" });
  }
  stu.name = name;
  stu.age = age;
  res.status(201).json({ message: "Data Update success ", data: stu });
});
app.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
  const stu = studentdata.findIndex((s) => s.id === id);
  if (stu === -1) {
    return res.status(404).json({ message: "Student Not Found" });
  }
  studentdata.splice(stu, 1);
  res.status(201).json({ message: "Data Update success ", data: stu });
});

app.listen(5000, () => {
  console.log("Server Start Port In  5000");
});
