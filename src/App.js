
import './App.css';
import React from "react";
import { BrowserRouter  as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          
         
         
          
        </Routes>
      </Router>
      </AuthProvider>
  );
}

export default App;