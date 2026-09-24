import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
const API_URL ="https://6a93813425936d5660f0b642.mockapi.io/uzairansari"

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Empty fields check
  if (!username || !email || !password) {
    setError("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(API_URL);
    const users = await response.json();

    const user = users.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    // Wrong credentials
    if (!user) {
      setError("email or password is incorrect");
      return;
    }

    // Correct credentials
    localStorage.setItem("user", JSON.stringify(username));
    localStorage.setItem("adminAccess", "true");

    setError("");
    navigate("/admin/dashboard");

  } catch (error) {
    console.log(error);
    setError("Unable to connect to server");
  }
};

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <p>Login to continue</p>

        <div className="input-box">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        <div className="input-box">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div className="input-box">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;