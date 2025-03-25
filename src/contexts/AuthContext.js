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

  // Dados de produção
  const [totalMel, setTotalMel] = useState(0);  
  const [totalColmeias, setTotalColmeias] = useState(0);  
  const [totalApiarios, setTotalApiarios] = useState(0); 

  const API_URL = "https://projeto-full-stack-apiariopro.onrender.com/gestao";
  const COLMEIAS_URL = "https://projeto-full-stack-apiariopro.onrender.com/colmeias";
  const APIARIOS_URL = "https://projeto-full-stack-apiariopro.onrender.com/apiarios";

  const fetchMelData = async () => {
    try {
      if (!token) return;

      const responseMel = await axios.get(`${API_URL}/mel/${usuarioId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const melData = responseMel.data;
      const total = melData.reduce((acc, item) => acc + Number(item.quantidade_florada || 0), 0);
      setTotalMel(total);  
    } catch (error) {
      console.error("Erro ao buscar dados de mel:", error);
    }
  };

  const fetchColmeiasData = async () => {
    try {
      if (!token || !usuarioId) return;

      const responseColmeias = await axios.get(`${COLMEIAS_URL}/${usuarioId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const colmeiasData = responseColmeias.data;
      const totalEmCampo = Object.values(colmeiasData.em_campo || {}).reduce(
        (acc, tipo) => acc + (tipo || 0),
        0
      );
      const totalVazias = Object.values(colmeiasData.vazia || {}).reduce(
        (acc, tipo) => acc + (tipo || 0),
        0
      );
      setTotalColmeias(totalEmCampo + totalVazias);  
      setColmeias(colmeiasData); 
    } catch (error) {
      console.error("Erro ao buscar dados de colmeias:", error);
    }
  };

  const fetchApiariosData = async () => {
    try {
      if (!token) return;

      const responseApiarios = await axios.get(`${APIARIOS_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTotalApiarios(responseApiarios.data.length);  
    } catch (error) {
      console.error("Erro ao buscar dados de apiários:", error);
    }
  };

  useEffect(() => {
    const storedUsuario = localStorage.getItem("usuario");
    const storedToken = localStorage.getItem("token");

    if (storedUsuario && storedToken) {
      const usuario = JSON.parse(storedUsuario);
      setNome(usuario.nome);
      setToken(storedToken);
      setUsuarioId(usuario.id); // Armazena o ID do usuário

      fetchMelData();
      fetchColmeiasData();
      fetchApiariosData();
    }
  }, []);

  const login = (usuario) => {
    setNome(usuario.nome);
    setToken(usuario.token);
    setUsuarioId(usuario.id); // Armazena o ID no estado global

    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("token", usuario.token);

    fetchMelData();
    fetchColmeiasData();
    fetchApiariosData();
  };

  const logout = () => {
    setNome("");
    setToken("");
    setUsuarioId(null); // Limpa o ID do usuário

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setColmeias({
      MELGUEIRA: { vazia: 0, em_campo: 0 },
      NINHO: { vazia: 0, em_campo: 0 },
      NUCLEO: { vazia: 0, em_campo: 0 },
    });
  };

  // Função de adicionar colmeia
  const handleAddColmeia = ({ tipo_colmeia, quantidade, estado }) => {
    setColmeias((prevColmeias) => {
      const newColmeias = {
        ...prevColmeias,
        [tipo_colmeia]: {
          ...prevColmeias[tipo_colmeia],
          [estado.toLowerCase()]: prevColmeias[tipo_colmeia][estado.toLowerCase()] + parseInt(quantidade, 10), // Atualiza a quantidade
        },
      };
      localStorage.setItem("colmeias", JSON.stringify(newColmeias));
      return newColmeias;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        nome,
        token,
        usuarioId,
        login,
        logout,
        sideBarIsActive,
        setSideBarIsActive,
        isActive,
        setIsActive,
        colmeias,
        totalMel,
        totalColmeias,
        totalApiarios,
        handleAddColmeia, // Agora a função está corretamente definida
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
