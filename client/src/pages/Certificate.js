// client/src/pages/Certificate.js

import { useParams, useNavigate } from "react-router-dom";

function Certificate() {
  const { title } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const courseTitle = decodeURIComponent(title);

  return (
    <div className="min-h-screen flex justify-center items-center bg-yellow-100">
      <div className="bg-white p-10 rounded-2xl shadow text-center w-[700px]">
        <h1 className="text-5xl font-bold text-yellow-600 mb-6">
          Certificate
        </h1>

        <p className="text-xl mb-4">
          This certifies that
        </p>

        <h2 className="text-4xl font-bold text-blue-700 mb-4">
          {user?.name}
        </h2>

        <p className="text-xl mb-4">
          successfully completed
        </p>

        <h3 className="text-3xl font-bold text-green-600 mb-8">
          {courseTitle}
        </h3>

        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl mr-4"
        >
          Print
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-600 text-white px-6 py-3 rounded-xl"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default Certificate;