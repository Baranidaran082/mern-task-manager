import mongoose from "mongoose";


// creating schema
const taskSchema = new mongoose.Schema({

 title:{
  type:String,
  required:true
 },

 description:{
  type:String
 },

 status:{
  type:String,
  default:"Pending"
 }

});


//creating model
const Task = mongoose.model("Task",taskSchema);

export default Task;