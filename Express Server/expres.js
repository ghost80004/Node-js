
const express = require("express");

const app = express()
app.get("/home",(req,res)=>{
    res.send("Hello Express Server")
   
})
app.listen(65535, (req, res) => {
  console.log("====================================");
  console.log("Express Server Is Running");
  console.log("====================================");
});


