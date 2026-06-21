import { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

export default function Login() {

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
        await axios.post(
          "http://localhost:5000/api/auth/login",
          form
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "username",
        response.data.username
      );

      window.location.href =
        "/dashboard";

    } catch (err) {

      setError(
        "Invalid Username or Password"
      );

    }

  };

  return (
    <div className="login-page">

      <div className="login-card">
        <div className="login-logo-wrap">
          <img
            src="/logo.png"
            alt="RG Kamdhenu"
            className="login-logo"
          />
        </div>

        <div className="login-header">

          <h1>
            RG Kamdhenu
          </h1>

          <p>
            Dairy Business Manager
          </p>

        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>
              Username
            </label>

            <input
              type="text"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username:
                    e.target.value,
                })
              }
              required
            />

          </div>

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
              required
            />

          </div>

          {error && (
            <div className="error-msg">
              {error}
            </div>
          )}

          <button
            className="login-btn"
            type="submit"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}