 const express = require('express');
 const connectDB = require("./config/database")
 const app = express();
 const User = require("./models/user");
 const user = require('./models/user');
 const {validateSignUpData} = require("./utils/validation");
 const bcrypt = require("bcrypt");
 const cookieParser = require("cookie-parser");
 const jwt = require("jsonwebtoken");
 const {userAuth} = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());

  // app.post("/signup", async (req,res) => {
    
  //   try{
  //     //validate 
  //     validateSignUpData(req);     
  //     //Encrypt the password
  //     const passwordHash = await bcrypt.hash(req.body.password, 10);
  //     console.log(passwordHash);  

  //     const user = new User(req.body); 
  //       await user.save();
  //      res.send("user added successfully");
  //   } catch (err){
  //     res.status(400).send("Error saving the user");
  //   }    
       
  // });
 
  app.post("/signup", async (req, res) => {
  try {
    // Validate input
    validateSignUpData(req);
    const {firstName, lastName,emailId,password} = req.body;
    // Hash password
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    console.log(passwordHash);
    //  Create user with hashed password
    const user = new User({
      firstName,lastName,emailId,      
      password: passwordHash
    });

    //  Save user
    await user.save();

    res.status(201).send("User added successfully");

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
});

 app.post("/login", async (req,res) =>{
  try{

    const {emailId,password} = req.body;
    const user = await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }
     const isPasswordValid = await user.validatePassword(password);
      if(isPasswordValid){

        //Create JWT Token
        const token = await user.getJWT();
         
        res.cookie("token",token);
        res.send("Login Successfull")
      }
      else{
        throw new Error("Invalid credentials");
      } 
  }
  catch (err) {
    res.status(400).json({
      error: err.message
    });
 }
}); 

  app.get("/profile", userAuth, async (req,res) => {
    try{
      const user = req.user; 
      res.send(user);
    }
    catch (err) {
    res.status(400).json({
      error: err.message
    });
 }

  })

  app.post("/sendConnectRequest", userAuth, async (req,res) =>{
    const user = req.user;

      console.log("Connection request send")

      res.send(user.firstName + " Sending the request");
  })

 connectDB().then(() => { 
    console.log("Database connect successfully...");
    app.listen(3000, () =>{
    console.log("Server is successfully on port 3000 ...");
 }); 
}).catch(err =>{
        console.log("Database can not connect successfully...");
 
});


  