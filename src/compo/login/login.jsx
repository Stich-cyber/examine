import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (username.toLowerCase().trim() === "giga" && password === "hello") {
      localStorage.setItem("token", "meow");
      onLogin();
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Welcome Back</h2>

        {error && <div className="error-message">{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="show-btn"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
