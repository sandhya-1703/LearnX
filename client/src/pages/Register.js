import { useState } from "react";

function Register() {
  fetch("https://learnx-backend.onrender.com/api/users/register")
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

  const handleSubmit = async () => {
    const res = await fetch("https://learnx-backend.onrender.com/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-orange-500">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96">
        <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-4"
        />

        <input
          type="email"
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
          className="w-full p-3 border rounded-xl mb-6"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-pink-600 text-white p-3 rounded-xl hover:bg-pink-800"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Register;