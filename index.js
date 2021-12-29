require("dotenv").config()
const express = require("express");
const app = express();
const cors = require('cors')
const route = require("./src/router/index")
const port = 2022;

app.use(cors())
app.use(express.json())
app.use("/api/v1",route);
app.use("/uploads",express.static("uploads"))



app.listen(port,()=>{
  console.log(`Listening ${port} is successfully`)
})