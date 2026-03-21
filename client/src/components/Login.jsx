import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ setIsUserInsideApp, setShowLoginPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      // ✅ store token
      localStorage.setItem("token", res.data.token);

      // ✅ enter app
      setIsUserInsideApp(true);

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Login</button>

      {/* 🔁 Go to Register */}
      <p
        onClick={() => setShowLoginPage(false)}
        style={{ cursor: "pointer", color: "blue" }}
      >
        Don't have an account? Register
      </p>
    </div>
  );
}

export default Login;   