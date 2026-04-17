import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/Tasklist.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { useState , useEffect } from "react";
import "./App.css";
import AIChatBox from "./components/AIChatBox";
import axios from "axios";


function App() {

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const token = sessionStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks(res.data);
  };


  

  //  Is user inside app or not
  const [isUserInsideApp, setIsUserInsideApp] = useState(
    !!sessionStorage.getItem("token")
  );

  //  Which page to show (Login or Register)
  const [showLoginPage, setShowLoginPage] = useState(true);


  // Run ONLY after login
  useEffect(() => {
    if (isUserInsideApp) {
      fetchTasks();
    }
  }, [isUserInsideApp]);




 
  //  If user NOT inside app
  if (!isUserInsideApp) {

    //  Show Login OR Register
    if (showLoginPage) {
      return (
        <Login
          setIsUserInsideApp={setIsUserInsideApp}
          setShowLoginPage={setShowLoginPage}
        />
      );
    } else {
      return (
        <Register
          setShowLoginPage={setShowLoginPage}
        />
      );
    }
  }


  //  If user IS inside app → show main UI
  return (
  <div>
    <div className="container">
      <h1>Task Manager</h1>

      <TaskForm fetchTasks={fetchTasks}/>
      <TaskList  tasks={tasks}  fetchTasks={fetchTasks}  />

      <button
        className="logout"
        onClick={() => {
          sessionStorage.removeItem("token");
          setIsUserInsideApp(false); // logout
        }}
      >
        Logout
      </button>
    </div>
    <div>
      <AIChatBox tasks={tasks} />
    </div>
  </div>
  );
}

export default App;