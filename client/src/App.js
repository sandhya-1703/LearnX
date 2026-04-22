// client/src/App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import LearnCourse from "./pages/LearnCourse";
import Certificate from "./pages/Certificate";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/courses" element={<Courses />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/learn/:title"
          element={<LearnCourse />}
        />

        <Route
          path="/certificate/:title"
          element={<Certificate />}
        />

        <Route path="/admin" element={<Admin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;