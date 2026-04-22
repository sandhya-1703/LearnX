import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDark(true);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div
      className={
        dark
          ? "min-h-screen bg-gray-900 text-white"
          : "min-h-screen bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 text-white"
      }
    >

      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-4xl font-bold">LearnX</h1>

        <div className="space-x-4">
          <button
            onClick={toggleTheme}
            className="bg-white text-black px-4 py-2 rounded-xl"
          >
            {dark ? "Light" : "Dark"}
          </button>

          <Link to="/login" className="bg-white text-blue-700 px-5 py-2 rounded-xl">
            Login
          </Link>

          <Link to="/register" className="bg-yellow-400 text-black px-5 py-2 rounded-xl">
            Register
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center px-6 pt-20"
      >
        <h2 className="text-6xl font-bold mb-6">
          Upgrade Your Skills 🚀
        </h2>

        <p className="text-xl max-w-3xl mx-auto mb-10">
          Learn career-ready courses with projects and certificates.
        </p>

        <Link
          to="/courses"
          className="bg-white text-purple-700 px-8 py-4 rounded-2xl text-xl font-bold inline-block"
        >
          Explore Courses
        </Link>
      </motion.div>

    </div>
  );
}

export default Home;