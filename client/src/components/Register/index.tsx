import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import "../../styles/global.scss";

interface RegisterForm {
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return setError("All fields are required.");
    }

    try {
      const res = await fetch(`http://127.0.0.1:3000/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.error || "Registration failed.");
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError("Could not register. Try again later.");
    }
  };

  return (
    <div className="diary-background">
      <div className="form-wrapper">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Create an Account</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Register</button>
          <div className="register-redirect">
            <button
              type="button"
              className="register-button"
              onClick={() => navigate("/home")}
            >
              Back to Login
            </button>
          </div>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Register;
