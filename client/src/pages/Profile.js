import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl text-center">

        <div className="w-28 h-28 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold">
          {user?.name?.charAt(0)}
        </div>

        <h1 className="text-4xl font-bold text-blue-700 mb-3">
          {user?.name}
        </h1>

        <p className="text-gray-600 text-xl mb-8">
          {user?.email}
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl mr-4"
        >
          Dashboard
        </button>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;