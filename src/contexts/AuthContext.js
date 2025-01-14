import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [sideBarIsActive, setSideBarIsActive] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Tarefas
  const [tarefas, setTarefas] = useState([]);
  
  // Colmeias
  const [colmeias, setColmeias] = useState({
    MELGUEIRA: { vazia: 0, em_campo: 0 },
    NINHO: { vazia: 0, em_campo: 0 },
    NUCLEO: { vazia: 0, em_campo: 0 },
  });

  // Carregar token e nome do usuário do localStorage no carregamento inicial
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Definir token e nome do usuário no localStorage
  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
  }, [token, userName]);

  // Buscar tarefas do servidor
  const fetchTarefas = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://lifetidy.onrender.com/tarefas/buscarTarefas",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTarefas(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  // Função para realizar o logout
  const logout = () => {
    setUserName("");
    setToken("");
  };

  // Função para adicionar colmeia
  const handleAddColmeia = ({ tipo_colmeia, quantidade, estado }) => {
    setColmeias((prevColmeias) => ({
      ...prevColmeias,
      [tipo_colmeia]: {
        ...prevColmeias[tipo_colmeia],
        [estado.toLowerCase()]: prevColmeias[tipo_colmeia][estado.toLowerCase()] + parseInt(quantidade, 10),
      },
    }));
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <AuthContext.Provider
      value={{
        userName,
        setUserName,
        token,
        setToken,
        logout,
        sideBarIsActive,
        setSideBarIsActive,
        tarefas,
        setTarefas,
        fetchTarefas,
        isActive,
        setIsActive,
        searchTerm,
        setSearchTerm,
        selectedDate,
        setSelectedDate,
        colmeias,
        handleAddColmeia, // Expondo a função de adicionar colmeia
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
