import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/Tasklist.jsx";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Task Manager</h1>

      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;