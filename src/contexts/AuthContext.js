import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [nome, setNome] = useState(""); // Alterado para 'nome' ao invés de 'userName'
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
    const storedUsuario = localStorage.getItem("usuario");
    if (storedUsuario) {
      const usuario = JSON.parse(storedUsuario);
      setNome(usuario.nome); // Carrega o nome do usuário no estado
    }
  }, []); // Apenas uma vez no carregamento do componente

  const login = (usuario) => {
    setNome(usuario.nome); // Atualiza o nome no contexto
    localStorage.setItem("usuario", JSON.stringify(usuario)); // Salva o usuário no localStorage
  };

  const logout = () => {
    localStorage.removeItem("usuario"); // Remove a chave "usuario" que contém o token e o nome
    setToken("");      // Atualiza o estado do token para vazio
    setNome("");       // Atualiza o estado do nome do usuário para vazio
  };
  // Buscar tarefas do servidor
  

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
        nome, // Agora passando o 'nome' em vez de 'userName'
        setNome, // Caso queira atualizar o nome
        token,
        login,
        setToken,
        logout,
        sideBarIsActive,
        setSideBarIsActive,
        tarefas,
        setTarefas,
        
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
