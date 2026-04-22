// client/src/pages/LearnCourse.js

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LearnCourse() {
  const { title } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const courseTitle = decodeURIComponent(title);

  const [progress, setProgress] = useState(0);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    const res = await fetch(
      `https://learnx-backend.onrender.com/api/courses/one/${encodeURIComponent(courseTitle)}`
    );

    const data = await res.json();
    setCourse(data);
  };

  const completeLesson = async () => {
    const res = await fetch(
      "https://learnx-backend.onrender.com/api/users/progress",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email,
          title: courseTitle
        })
      }
    );

    const data = await res.json();
    setProgress(data.progress);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 bg-blue-600 text-white px-5 py-2 rounded-xl"
      >
        Back
      </button>

      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        {courseTitle}
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <iframe
          className="w-full h-[500px] rounded-xl"
          src={course?.video}
          title="course-video"
          allowFullScreen
        ></iframe>
      </div>

      <p className="text-xl mb-4">
        Progress: {progress}%
      </p>

      {progress < 100 ? (
        <button
          onClick={completeLesson}
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Complete Lesson
        </button>
      ) : (
        <button
          onClick={() =>
            navigate(`/certificate/${encodeURIComponent(courseTitle)}`)
          }
          className="bg-yellow-500 text-white px-6 py-3 rounded-xl"
        >
          Get Certificate
        </button>
      )}

    </div>
  );
}

export default LearnCourse;