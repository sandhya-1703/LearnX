import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
fetch("https://learnx-backend.onrender.com/api/users/profile")

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
    const res = await fetch("https://learnx-backend.onrender.com/api/users/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: storedUser.email
      })
    });

    const data = await res.json();
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-6 hidden md:block">
        <h1 className="text-3xl font-bold mb-10">LearnX</h1>

        <ul className="space-y-5 text-lg mb-10">
          <li
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer hover:text-yellow-300"
          >
            Dashboard
          </li>

          <li
            onClick={() => navigate("/courses")}
            className="cursor-pointer hover:text-yellow-300"
          >
            Courses
          </li>

          <li
            onClick={() => navigate("/profile")}
            className="cursor-pointer hover:text-yellow-300"
          >
            Profile
          </li>
        </ul>

        <button
          onClick={logout}
          className="bg-red-500 px-5 py-2 rounded-xl hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-blue-700 mb-3">
          Welcome {user?.name}
        </h1>

        <p className="text-gray-500 mb-8">
          Continue your learning journey 🚀
        </p>

        <h2 className="text-2xl font-bold mb-5">
          My Courses
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {user?.courses?.map((course, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl shadow">

              <h3 className="text-xl font-bold mb-3">
                {course.title}
              </h3>

              <p className="text-gray-500 mb-2">
                Progress: {course.progress}%
              </p>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>

              <button
                onClick={() =>
                  navigate(`/learn/${encodeURIComponent(course.title)}`)
                }
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
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