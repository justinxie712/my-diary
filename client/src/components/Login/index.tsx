import { useCallback, useState } from "react";
import "./styles.scss";
import "../../styles/global.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const res = await fetch("http://127.0.0.1:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok) {
          login(data.token);
        } else {
          toast.error(data.msg || "Login failed. Please try again.");
        }
      } catch (err) {
        toast.error("Network error. Please check your connection.");
      }
    },
    [username, password, login]
  );

  return (
    <div className="diary-background">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Login to Diary.me</h1>
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
            <button
              type="button"
              className="register-button"
              onClick={() => navigate("/register")}
            >
              Create an Account
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Login;
