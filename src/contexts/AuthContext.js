import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const [sideBarIsActive, setSideBarIsActive] = useState(false);
  const [isActive, setIsActive] = useState(false);

  //Tarefas
  const [tarefas, setTarefas] = useState([]);

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
      const token = localStorage.getItem("token"); // Recupera o token do localStorage

      const response = await axios.get(
        "https://lifetidy.onrender.com/tarefas/buscarTarefas",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTarefas(response.data); // Atualiza o estado com as tarefas recebidas do backend
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTarefas(); // Chama a função para buscar as tarefas quando o componente é montado
  }, []);  // O array vazio como segundo argumento faz com que o useEffect execute apenas uma vez, quando o componente é montado

  // Função para realizar o logout
  const logout = () => {
    setUserName("");
    setToken("");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);