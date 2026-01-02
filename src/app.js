 const express = require('express');

 const app = express();

 app.get("/user", (req,res) =>{
   res.send({fistName:"Rohit", lastName:"Khadang"});
 });
 
 app.post("/user", (req,res) => {
   res.send("Data successfully saved to the database");
 });

 app.delete("/user", (req,res) => {
   res.send("Deleted successfully");
 });
 
 app.use("/test",(req,res) =>{
    res.send("Hello, from  the test server 3000");
 });

  

 app.listen(3000, () =>{
    console.log("Server is successfully on port 3000 ...");
 }); //Passing port
  