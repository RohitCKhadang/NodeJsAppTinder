 const express = require('express');

 const app = express();
 
 app.use("/hello",(req,res) =>{
    res.send("Hello,Hello from the server 3000");
 });

 app.use("/test",(req,res) =>{
    res.send("Hello, from  the test server 3000");
 });

 app.listen(3000, () =>{
    console.log("Server is successfully on port 3000 ...");
 }); //Passing port
  