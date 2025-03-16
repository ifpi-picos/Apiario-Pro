import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [nome, setNome] = useState(""); // Nome do usuário
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
    const storedToken = localStorage.getItem("token");

    if (storedUsuario && storedToken) {
      const usuario = JSON.parse(storedUsuario);
      setNome(usuario.nome); // Carrega o nome do usuário no estado
      setToken(storedToken); // Carrega o token no estado

      // Buscar as colmeias do banco de dados com o usuarioId
      const usuarioId = usuario.id; // Assume que o ID do usuário está salvo no localStorage
      buscarColmeias(usuarioId);
    }
  }, []); // Apenas uma vez no carregamento do componente

  const buscarColmeias = async (usuarioId) => {
    try {
      const response = await axios.get(`/api/colmeias/${usuarioId}`);
      setColmeias(response.data); // Atualiza as colmeias no estado com os dados do banco
    } catch (error) {
      console.error("Erro ao buscar colmeias:", error);
    }
  };

  const login = (usuario) => {
    setNome(usuario.nome); // Atualiza o nome no contexto
    setToken(usuario.token); // Define o token no contexto
    localStorage.setItem("usuario", JSON.stringify(usuario)); // Salva o usuário no localStorage
    localStorage.setItem("token", usuario.token); // Salva o token no localStorage

    // Buscar as colmeias após o login
    buscarColmeias(usuario.id); // Envie o ID do usuário para buscar as colmeias
  };

  const logout = () => {
    // Remover os dados do usuário do contexto
    setNome("");
    setToken("");

    // Limpar os dados do usuário e das colmeias no localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("colmeias");

    // Limpar os dados das colmeias no estado global
    setColmeias({
      MELGUEIRA: { vazia: 0, em_campo: 0 },
      NINHO: { vazia: 0, em_campo: 0 },
      NUCLEO: { vazia: 0, em_campo: 0 },
    });
  };

  // Função para adicionar colmeia
  const handleAddColmeia = ({ tipo_colmeia, quantidade, estado }) => {
    setColmeias((prevColmeias) => {
      const novoEstado = estado.toLowerCase(); // "em_campo" ou "vazia"
      return {
        ...prevColmeias,
        [tipo_colmeia]: {
          ...prevColmeias[tipo_colmeia],
          [novoEstado]: prevColmeias[tipo_colmeia][novoEstado] + parseInt(quantidade, 10),
        },
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        nome,
        setNome,
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
        colmeias,
        handleAddColmeia,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
