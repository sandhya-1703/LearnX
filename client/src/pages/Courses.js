// client/src/pages/Courses.js

import { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await fetch(
      "https://learnx-backend.onrender.com/api/courses/all"
    );

    const data = await res.json();
    setCourses(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        All Courses
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-5 rounded-2xl shadow"
          >
            <h2 className="text-2xl font-bold mb-3">
              {course.title}
            </h2>

            <p className="text-gray-500">
              {course.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;