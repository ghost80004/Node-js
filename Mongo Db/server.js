const express = require("express")
const app = express()

app.listen(process.env.PORT, ()=>{
    console.log('====================================');
    console.log(`Server Is Running port: ${process.env.PORT} `);
    console.log('====================================');
})