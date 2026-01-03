 const express = require('express');

 const app = express();


 app.get("/user", [(req,res, next) => {
    console.log("Route handler 1");
   //res.send("Response 1");
   next();
 }, (req, res, next) => {
    console.log("Route Handler 2");
    //res.send("Response 2");
    next();
 }], (req,res,next) => {
  console.log("Request Handler 3")
  res.send("Response 3")
 });
  

 app.listen(3000, () =>{
    console.log("Server is successfully on port 3000 ...");
 }); //Passing port
  