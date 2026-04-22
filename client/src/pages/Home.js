// client/src/pages/Home.js

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold mb-6">
        LearnX
      </h1>

      <p className="text-2xl mb-8">
        Learn Skills. Build Career.
      </p>

      <div className="flex gap-5">
        <Link
          to="/login"
          className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-green-500 px-6 py-3 rounded-xl font-bold"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;