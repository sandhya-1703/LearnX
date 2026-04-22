// client/src/pages/Login.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const loginUser = async () => {
    const res = await fetch(
      "https://learnx-backend.onrender.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login Success");
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow w-[400px]">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-4"
        />

        <button
          onClick={loginUser}
          className="w-full bg-blue-600 text-white p-3 rounded-xl"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;