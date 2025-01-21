
import './App.css';
import React from "react";
import { BrowserRouter  as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Header from "./components/HeaderPrincipal";
import { AuthProvider } from "./contexts/AuthContext";
import Apiarios from "./pages/Apiarios";
import Floradas from "./pages/Floradas";
import Colmeias from "./pages/Colmeias";
import Gestao from "./pages/Gestao";
import Producao from "./pages/Producao";
import Geolocalizacao from "./pages/Geolocalizacao";
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
          <Route path="/apiarios" element={<Apiarios />} />
          <Route path="/floradas" element={<Floradas />} />
          <Route path="/colmeias" element={<Colmeias />} />
          <Route path="/gestao" element={<Gestao />} />
          <Route path="/producao" element={<Producao />} />
          <Route path="/geolocalizacao" element={<Geolocalizacao />} />
        </Routes>
      </Router>
      </AuthProvider>
  );
}

export default App;