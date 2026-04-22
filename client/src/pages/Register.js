// client/src/pages/Register.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async () => {
    const res = await fetch(
      "https://learnx-backend.onrender.com/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    const data = await res.json();

    alert(data.message);

    if (data.message === "User Registered Successfully") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow w-[400px]">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-4"
        />

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
          onClick={registerUser}
          className="w-full bg-green-600 text-white p-3 rounded-xl"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;