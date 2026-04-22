import { useEffect, useState } from "react";
fetch("https://learnx-backend.onrender.com/api/courses/one/...")
fetch("https://learnx-backend.onrender.com/api/users/progress")

function Admin() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    video: ""
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await fetch("https://learnx-backend.onrender.com/api/courses/all");
    const data = await res.json();
    setCourses(data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addCourse = async () => {
    await fetch("https://learnx-backend.onrender.com/api/courses/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    setForm({
      title: "",
      description: "",
      video: ""
    });

    loadCourses();
  };

  const deleteCourse = async (id) => {
    await fetch(`https://learnx-backend.onrender.com/api/courses/${id}`, {
      method: "DELETE"
    });

    loadCourses();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Admin Panel
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-5">Add Course</h2>

        <input
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-4"
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-4"
        />

        <input
          name="video"
          placeholder="YouTube Embed Link"
          value={form.video}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-4"
        />

        <button
          onClick={addCourse}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Add Course
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-5">All Courses</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-5 rounded-2xl shadow"
          >
            <h3 className="text-xl font-bold mb-2">
              {course.title}
            </h3>

            <p className="text-gray-500 mb-4">
              {course.description}
            </p>

            <button
              onClick={() => deleteCourse(course._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-xl"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Admin;