import { useEffect, useState } from "react";
fetch("https://learnx-backend.onrender.com/api/courses/all")
fetch("https://learnx-backend.onrender.com/api/users/enroll")

function Courses() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await fetch("https://learnx-backend.onrender.com/api/courses/all");
    const data = await res.json();
    setCourses(data);
  };

  const joinCourse = async (title) => {
    const res = await fetch("https://learnx-backend.onrender.com/api/users/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: user.email,
        title: title
      })
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Explore Courses
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h2 className="text-2xl font-bold mb-3">
              {course.title}
            </h2>

            <p className="text-gray-500 mb-4">
              {course.description}
            </p>

            <button
              onClick={() => joinCourse(course.title)}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-800"
            >
              Join Course
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Courses;