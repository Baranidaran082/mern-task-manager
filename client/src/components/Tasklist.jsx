import { useState } from "react";
import axios from "axios";
import "./Tasklist.css"

function TaskList({ tasks , fetchTasks }){


  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");



  // Delete task
  const deleteTask = async (id) => {
    const token = sessionStorage.getItem("token");

    await axios.delete(`http://localhost:5000/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      fetchTasks();

  };

  // Edit task
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // Update the edited task
  const updateTask = async () => {
    const token = sessionStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/tasks/${editingId}`,
      {
        title: editTitle,
        description: editDescription,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEditingId(null);
      fetchTasks();

  };

  return (
    <div>
      <h2>Tasks</h2>

      {tasks.map((task) => (
        <div className="task" key={task._id}>
          {editingId === task._id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <br />

              <input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
              <br />

              <button onClick={updateTask}>Save</button>
            </>
          ) : (
            <>
              <b>{task.title}</b>
              <br />
              <span>{task.description}</span>
              <br />

              <button onClick={() => startEdit(task)}>Edit</button>
              <button className="deleteBtn" onClick={() => deleteTask(task._id)}>Delete</button> 
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;