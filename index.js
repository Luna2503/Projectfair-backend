const router= require('./Routes/router')

const appMiddleware=require('./Middlewares/appMiddleware')
//1)  import .env
require('dotenv').config()

//2) import express 
const express =require("express")
//import connection.js

require('./DB/connections')

//3)import cors
const cors=require("cors")

//4)create server
const pfserver =express();
//5)make use of cors by server
pfserver.use(cors())

//6)use a middleware, to convert json javascript object
pfserver.use(express.json())

// pfserver.use(appMiddleware)

pfserver.use(router)

pfserver.use('/uploads',express.static('./uploads'))

//7)define port
const PORT = 4000;

//8)run the server
pfserver.listen(PORT,()=>{
    console.log(`Server is running  successfully at port: ${PORT}`);
})

pfserver.get('/',(req,res)=>{
    res.send("Project fair server is running successfully")
})