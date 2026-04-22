// client/src/pages/Dashboard.js

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await fetch(
      "https://learnx-backend.onrender.com/api/users/profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: storedUser.email
        })
      }
    );

    const data = await res.json();
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-blue-700 text-white p-6 hidden md:block">
        <h1 className="text-3xl font-bold mb-10">LearnX</h1>

        <button
          onClick={logout}
          className="bg-red-500 px-5 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-3">
          Welcome {user?.name}
        </h1>

        <h2 className="text-2xl font-bold mt-10 mb-5">
          My Courses
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {user?.courses?.map((course, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow"
            >
              <h3 className="text-xl font-bold mb-3">
                {course.title}
              </h3>

              <p className="text-gray-500 mb-2">
                Progress: {course.progress}%
              </p>

              <button
                onClick={() =>
                  navigate(`/learn/${encodeURIComponent(course.title)}`)
                }
                className="bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;