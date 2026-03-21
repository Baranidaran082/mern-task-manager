import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/Tasklist.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { useState } from "react";
import "./App.css";

function App() {

  // ✅ Is user inside app or not
  const [isUserInsideApp, setIsUserInsideApp] = useState(
    !!localStorage.getItem("token")
  );

  // ✅ Which page to show (Login or Register)
  const [showLoginPage, setShowLoginPage] = useState(true);


  // 🔐 If user NOT inside app
  if (!isUserInsideApp) {

    // 👉 Show Login OR Register
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


  // ✅ If user IS inside app → show main UI
  return (
    <div className="container">
      <h1>Task Manager</h1>

      <TaskForm />
      <TaskList />

      <button
        style={{
          background: "#dc3545",
          color: "white",
          border: "none",
          padding: "8px 15px",
          borderRadius: "8px"
        }}
        onClick={() => {
          localStorage.removeItem("token");
          setIsUserInsideApp(false); // logout
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default App;