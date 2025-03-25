import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Função para recuperar dados do localStorage
const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  
  if (!data) return null;

  try {
    return JSON.parse(data); // Tenta fazer parse de dados JSON
  } catch (e) {
    return data; // Se falhar, retorna o valor como string (exemplo: token JWT)
  }
};

// Função para salvar dados no localStorage
const saveToLocalStorage = (key, value) => {
  if (typeof value === "object") {
    localStorage.setItem(key, JSON.stringify(value)); // Salva objetos como JSON
  } else {
    localStorage.setItem(key, value); // Salva como string (como um token JWT)
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [nome, setNome] = useState(""); // Nome do usuário
  const [token, setToken] = useState(""); // Token JWT
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
    const storedUsuario = getFromLocalStorage("usuario");
    const storedToken = getFromLocalStorage("token");

    if (storedUsuario && storedToken) {
      setNome(storedUsuario.nome);
      setToken(storedToken);
      setUsuarioId(storedUsuario.id); // Armazena o ID do usuário

      buscarColmeias(storedUsuario.id);
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

    saveToLocalStorage("usuario", usuario); // Armazena o usuário como JSON
    saveToLocalStorage("token", usuario.token); // Armazena o token como string

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
    localStorage.removeItem("dadosProducao");

    setColmeias({
      MELGUEIRA: { vazia: 0, em_campo: 0 },
      NINHO: { vazia: 0, em_campo: 0 },
      NUCLEO: { vazia: 0, em_campo: 0 },
    });
  };

  // Adicionar colmeia
  const handleAddColmeia = ({ tipo_colmeia, quantidade, estado }) => {
    setColmeias((prevColmeias) => {
      const newColmeias = {
        ...prevColmeias,
        [tipo_colmeia]: {
          ...prevColmeias[tipo_colmeia],
          [estado.toLowerCase()]: parseInt(quantidade, 10), // Substitui o valor da quantidade
        },
      };
      saveToLocalStorage("colmeias", newColmeias); // Atualiza as colmeias no localStorage
      return newColmeias;
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
