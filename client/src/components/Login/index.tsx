import { useState } from "react";
import "./styles.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      login(data.token);
    } else {
      alert(data.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login to Diary.me</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      <div className="register-redirect">
        <p>Don't have an account?</p>
        <button
          type="button"
          className="register-button"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default Login;
