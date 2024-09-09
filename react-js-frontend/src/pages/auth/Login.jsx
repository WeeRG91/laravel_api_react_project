import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(formData);

    const res = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      console.log(data);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
    }
  };

  return (
    <>
      <h1 className="title">Login to your account</h1>

      <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button className="primary-btn">Login</button>
      </form>
    </>
  );
}
