 const express = require('express');
 const connectDB = require("./config/database")
 const app = express();
 const User = require("./models/user");
 const user = require('./models/user');

 app.use(express.json());

  app.post("/signup", async (req,res) => {
     
    //Creating a new instance of the user models
    const user = new User(req.body); 
    try{
        await user.save();
       res.send("user added successfully");
    } catch (err){
      res.status(400).send("Error saving the user");
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
app.patch("/user", async (req,res) => {
  const userId = req.body.userId;
  const data = req.body;

  try{
    await User.findByIdAndUpdate({_id: userId},data);
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


  