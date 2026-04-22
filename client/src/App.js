import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import LearnCourse from "./pages/LearnCourse";
import Certificate from "./pages/Certificate";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-between px-10 py-5 bg-black text-white">
        <h1 className="text-3xl font-bold">LearnX</h1>

        <div className="space-x-6">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn/:title" element={<LearnCourse />} />
        <Route path="/certificate/:title" element={<Certificate />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;