import { useState, useEffect } from "react";
import useAuthStore from "./hooks/useAuthStore";
import { LogIn } from "./pages/LogIn";
import { Home } from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Spinner from "./components/Spinner";

function App() {
  const { status, chechAuthToken } = useAuthStore();

  useEffect(() => {
    chechAuthToken();
  }, []);

  if (status === "checking") {
    return <div className="spinner-container">
      <Spinner />
    </div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {status === "not-authenticated" ? (
          <>
            <Route path="/auth/*" element={<LogIn />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
