import { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register({ setShowLoginPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/register", {
        email,
        password,
      });

      alert("Registered successfully ✅");

      // 🔁 go back to login page 
      setShowLoginPage(true);

    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

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

      <button onClick={handleRegister}>Register</button>

      {/* 🔁 Go to Login */}
      <p
        onClick={() => setShowLoginPage(true)}
        style={{ cursor: "pointer" }}
      >
        Already have an account? Login
      </p>
    </div>
  );
}

export default Register;