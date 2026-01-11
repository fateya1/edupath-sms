import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { AuthProvider } from "./context/AuthContext";
import { StudentsProvider } from "./context/StudentsContext";

import ProtectedLayout from "./layouts/ProtectedLayout";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Admissions from "./pages/Admissions";
import Classes from "./pages/Classes";
import Teachers from "./pages/Teachers";
import NotAuthorized from "./pages/NotAuthorized";

import { warmUpBackend } from "./services/warmup";

export default function App() {
  useEffect(() => {
    warmUpBackend(); // background warmup on app load
  }, []);

  return (
    <AuthProvider>
      <StudentsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/teachers" element={<Teachers />} />
            </Route>

            <Route path="/not-authorized" element={<NotAuthorized />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </StudentsProvider>
    </AuthProvider>
  );
}
