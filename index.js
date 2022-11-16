const express = require("express")
require('dotenv').config()
//! express
const app = express();
const controllerLoader = require("./utils/controller_loader")

const PORT =4001;
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

controllerLoader.loadToAppFromPath(app, require("path").join(__dirname, "controllers"))
//! routes
app.get("/", (req,res)=>{
  
    res.sendStatus(200)
})

app.listen(PORT,()=>console.log(`Server Listening on ${PORT}`))