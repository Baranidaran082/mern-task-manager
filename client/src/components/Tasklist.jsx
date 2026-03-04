import { useState, useEffect } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data));
  }, []);




  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);

    setTasks(tasks.filter((task) => task._id !== id));
  };



  

  return (
    <div>
      <h2>Tasks</h2>

      {tasks.map((task) => (
        <div className="task" key={task._id}>
          <b>{task.title}</b>
          <br />
          <span>{task.description}</span>
          <br />

          <button className="deleteBtn" onClick={() => deleteTask(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;