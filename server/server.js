import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Task from "./models/Task.js";  
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import dotenv from "dotenv";


const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
.then(()=>console.log("MongoDB Connected"));

/* REGISTER */

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ 
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





/* LOGIN */

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);



    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





const authMiddleware = (req, res, next) => {
  try {
    // get token
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // ✅ Expect: "Bearer token"
    const actualToken = token.split(" ")[1];

    if (!actualToken) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // ✅ IMPORTANT: same secret as login
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;





/* CREATE TASK */

app.post("/tasks",authMiddleware, async (req,res)=>{

 const task = new Task({
      title: req.body.title,
    description: req.body.description,
    userId: req.user.id   // 🔥 important
});

 await task.save();

 res.json(task);

});





/* GET TASKS */

app.get("/tasks",authMiddleware, async (req,res)=>{

 const tasks = await Task.find( {userId: req.user.id});

 res.json(tasks);

});





/* UPDATE TASK */

app.put("/tasks/:id", authMiddleware, async (req, res) => {
  const updatedTask = await Task.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user.id   // 🔥 only owner can update
    },
    req.body,
    { new: true }
  );
 res.json(updatedTask);

});






/* DELETE TASK */

app.delete("/tasks/:id", authMiddleware, async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id   // 🔥 only owner can delete
  });

  res.json({ message: "Task deleted" });
});






app.listen(5000,()=>{
 console.log("Server running on port 5000");
});