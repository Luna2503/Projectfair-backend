const { response } = require('express');
const jwt=require('jsonwebtoken')
const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwt middleware");
    console.log("tooooo",req.headers['authorization'])
    const token=req.headers['authorization'].split(' ')[1]
    console.log(token);
    try{
        const jwtResponse=jwt.verify(token,'supersecretkey12345')
        console.log("====jwtresponse====",jwtResponse);
        req.payload=jwtResponse.userId
        next()
    }catch(err){
        res.status(401).json("Authorization failed,Please Login")
    }

}
module.exports=jwtMiddleware;