 const express = require('express');
 const connectDB = require("./config/database")
 const app = express();

 const User = require("./models/user");

  app.post("/signup", async (req,res) => {
     
    //Creating a new instance of the user models
    const user = new User({
      firstName : "Onkar",
      lastName : "Medhekar",
      emailId: "onkar@gmail.com",
      password: "onkar@123"
    }); 
    try{
        await user.save();
       res.send("user added successfully");
    } catch (err){
      res.status(400).send("Error saving the user");
    }    
       
  });
 
 connectDB().then(() => { 
    console.log("Database connect successfully...");
    app.listen(3000, () =>{
    console.log("Server is successfully on port 3000 ...");
 }); 
}).catch(err =>{
        console.log("Database can not connect successfully...");
 
});


  