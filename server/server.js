import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Task from "./models/Task.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
.then(()=>console.log("MongoDB Connected"));

/* CREATE TASK */

app.post("/tasks", async (req,res)=>{

 const task = new Task(req.body);

 await task.save();

 res.json(task);

});

/* GET TASKS */

app.get("/tasks", async (req,res)=>{

 const tasks = await Task.find();

 res.json(tasks);

});

/* UPDATE TASK */

app.put("/tasks/:id", async (req,res)=>{

 const updatedTask = await Task.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new:true }
 );

 res.json(updatedTask);

});

/* DELETE TASK */

app.delete("/tasks/:id", async (req,res)=>{

 await Task.findByIdAndDelete(req.params.id);

 res.json({message:"Task deleted"});

});

app.listen(5000,()=>{
 console.log("Server running on port 5000");
});