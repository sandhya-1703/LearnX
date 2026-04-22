import { useParams, useNavigate } from "react-router-dom";

function Certificate() {
  const { title } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const courseTitle = decodeURIComponent(title);

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-10">

      <div className="bg-white border-8 border-yellow-500 rounded-3xl shadow-2xl p-12 text-center max-w-4xl w-full">

        <h1 className="text-5xl font-bold text-yellow-700 mb-6">
          Certificate of Completion
        </h1>

        <p className="text-xl mb-4">
          This certifies that
        </p>

        <h2 className="text-4xl font-bold text-blue-700 mb-6">
          {user?.name}
        </h2>

        <p className="text-xl mb-4">
          has successfully completed
        </p>

        <h3 className="text-3xl font-bold text-green-700 mb-8">
          {courseTitle}
        </h3>

        <p className="text-gray-500 mb-10">
          Issued by LearnX
        </p>

        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl mr-4"
        >
          Download PDF
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