 const express = require('express');
 const connectDB = require("./config/database")
 const app = express();
 const User = require("./models/user");
 const user = require('./models/user');
 const {validateSignUpData} = require("./utils/validation");
 const bcrypt = require("bcrypt");

app.use(express.json());

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
     const isPasswordValid = await bcrypt.compare(password, user.password)
      if(isPasswordValid){
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


  app.get("/user", async (req,res)=>{
    const userEmail = req.body.emailId; 
    try{
      const user = await User.findOne({emailId: userEmail})
      if(!user){
        res.status(400).send("User not found")
      }
      res.send(user);
    }
    catch (err){
      res.status(400).send("Something went wrong");
    }

  });
 
  app.get("/feed", async (req, res) => {
    try{
      const user = await User.find({});
      res.send(user);
    }
    catch{
      res.status(400).send("User Not Found");
    }
    
  });

  //Delete a user 
  app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
 
//Patch
app.patch("/user/:userId", async (req,res) => {
  const userId = req.params?.userId;
  const data = req.body;

  

  try{

  const allow_update =["photoUrl","about","gender","age","skills"];
  const isUpdateAllowed = Object.keys(data).every((k) =>
   allow_update.includes(k)
  ); 
  if(!isUpdateAllowed){
    throw new Error("Update not be allowed")
  };
  if(data?.skills.length > 5){
    throw new Error("Skills cannot greater than 5")
  };

    await User.findByIdAndUpdate({_id: userId},data,{
      runValidators:true,
    });
    res.send("User updated successfully");
  }
  catch (err){
    res.status(400).send("Something went wrong");
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


  