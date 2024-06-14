import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/SignupPage";
import TreeTest from "./pages/Dashboard";
import AdminPage from "./pages/Admin";

import "./App.css";
//import './pages/styles/background.css';

import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  //Configuration axios

  const baseURL = "http://localhost:5000"; //ordinateur
  // const baseURL ="http://192.168.137.1:5000";  //telephone
  axios.defaults.baseURL = baseURL;
  axios.defaults.withCredentials = true; // Activer les cookies cross-origin
  console.log(axios.defaults.baseURL);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté en consultant le localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(localStorage.getItem("role") === "admin");
    }
  }, []);

  // Fonction pour connecter l'utilisateur
  const login = () => {
    setIsAdmin(localStorage.getItem("role") === "admin");
    setIsLoggedIn(true);
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = async () => {
    try {
      await axios.get("/auth/logout");
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      console.log("log out successfully");
    } catch (error) {
      console.error("Error:", error);
      console.log(
        error.response.data.error ||
          error.response.data.message ||
          "An error occurred"
      );
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar isLoggedIn={isLoggedIn} logout={logout} isAdmin={isAdmin} />
        <div className="page-content">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<TreeTest />} />
            <Route
              path="/admin"
              element={<AdminPage isLoggedIn={isLoggedIn} isAdmin={isAdmin} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
