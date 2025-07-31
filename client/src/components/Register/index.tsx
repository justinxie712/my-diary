import React, { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import "../../styles/global.scss";
import { ToastContainer, toast } from "react-toastify";

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
}

const Register: FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
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
        return toast.error(data.error || "Registration failed.");
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      toast.error("Could not register. Try again later.");
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            disabled={
              !formData.username ||
              !formData.password ||
              !formData.confirmPassword
            }
            type="submit"
          >
            Register
          </button>
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
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
};

export default Register;
