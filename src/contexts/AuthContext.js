import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [nome, setNome] = useState(""); // Nome do usuário
  const [token, setToken] = useState("");
  const [usuarioId, setUsuarioId] = useState(null); // ID do usuário
  const [sideBarIsActive, setSideBarIsActive] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Colmeias
  const [colmeias, setColmeias] = useState({
    MELGUEIRA: { vazia: 0, em_campo: 0 },
    NINHO: { vazia: 0, em_campo: 0 },
    NUCLEO: { vazia: 0, em_campo: 0 },
  });

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUsuario = localStorage.getItem("usuario");
    const storedToken = localStorage.getItem("token");

    if (storedUsuario && storedToken) {
      const usuario = JSON.parse(storedUsuario);
      setNome(usuario.nome);
      setToken(storedToken);
      setUsuarioId(usuario.id); // Armazena o ID do usuário

      buscarColmeias(usuario.id);
    }
  }, []);

  // Buscar colmeias do usuário
  const buscarColmeias = async (usuarioId) => {
    if (!usuarioId) return; // Evita chamadas desnecessárias

    try {
      const response = await axios.get(`https://projeto-full-stack-apiariopro.onrender.com/colmeias/${usuarioId}`);
      setColmeias(response.data); // Atualiza colmeias no estado
    } catch (error) {
      console.error("Erro ao buscar colmeias:", error);
    }
  };

  // Login do usuário
  const login = (usuario) => {
    setNome(usuario.nome);
    setToken(usuario.token);
    setUsuarioId(usuario.id); // Armazena o ID no estado global

    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("token", usuario.token);

    buscarColmeias(usuario.id);
  };

  // Logout do usuário
  const logout = () => {
    setNome("");
    setToken("");
    setUsuarioId(null); // Limpa o ID do usuário

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("colmeias");

    setColmeias({
      MELGUEIRA: { vazia: 0, em_campo: 0 },
      NINHO: { vazia: 0, em_campo: 0 },
      NUCLEO: { vazia: 0, em_campo: 0 },
    });
  };

  // Adicionar colmeia
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
        usuarioId, // Agora pode ser acessado em qualquer lugar
        login,
        setToken,
        logout,
        sideBarIsActive,
        setSideBarIsActive,
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
