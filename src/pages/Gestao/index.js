import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import Header from "../../components/HeaderPrincipal/index.js";
import ModalProducao from "../../components/ModalProducao/index.js";
import { useAuth } from "../../contexts/AuthContext";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import axios from "axios";
import {
  AppBody,
  Main,
  DivGraf,
  DivPrincipal,
  DivStyle1,
  DivStyle2,
  ContainerH2,
  BotaoAno,
  StyledIcon,
  ContainerAdicionar,
} from "./styles";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const API_URL = "https://projeto-full-stack-apiariopro.onrender.com/gestao";

const Gestao = () => {
  const [showModal, setShowModal] = useState(false);
  const [dadosProducao, setDadosProducao] = useState([]);
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const { token } = useAuth();

  useEffect(() => {
    const fetchProducao = async () => {
      try {
        const storedToken = token || localStorage.getItem("token");
        if (!storedToken) return;

        const response = await axios.get(`${API_URL}/${anoSelecionado}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
      
        setDadosProducao(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar produção:", error);
      }
    };

    fetchProducao();
  }, [anoSelecionado, token]);
  const resetarGraficos = async () => {
    try {
      await axios.delete(`${API_URL}/deletar/${anoSelecionado}`);
      
      // Define o estado como um array vazio após resetar
      setDadosProducao([]);
  
      alert("Dados de produção apagados com sucesso!");
    } catch (error) {
      console.error("Erro ao resetar os gráficos e dados:", error);
      alert("Erro ao resetar os gráficos e dados.");
    }
  };
  
  const dadosFlorada = dadosProducao.reduce((acc, item) => {
    acc[item.florada] = (acc[item.florada] || 0) + Number(item.quantidade_florada);
    return acc;
  }, {});

  const pieData = Object.keys(dadosFlorada).length > 0 ? {
    labels: Object.keys(dadosFlorada),
    datasets: [
      {
        label: "Produção por florada (Kg)",
        data: Object.values(dadosFlorada),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#32CD32"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#32CD32"],
      },
    ],
  } : {
    labels: ["Sem Dados"],
    datasets: [
      {
        label: "Sem Produção",
        data: [1],
        backgroundColor: ["#D3D3D3"],
        hoverBackgroundColor: ["#D3D3D3"],
      },
    ],
  };



  const dadosMensais = dadosProducao.reduce((acc, item) => {
    acc[item.mes] = (acc[item.mes] || 0) + Number(item.quantidade_mes);
    return acc;
  }, {});

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const barData = {
    labels: meses,
    datasets: [
      {
        label: "Produção de Mel (kg)",
        data: meses.map(mes => dadosMensais[mes] || 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <AppBody>
      <Header />
      <Main>
        <DivPrincipal>
          <ContainerH2>
            <h2 style={{ textAlign: "center" }}>Gestão de Produção de Mel</h2>
            <BotaoAno>
              <select
                value={anoSelecionado}
                onChange={(e) => setAnoSelecionado(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value={anoSelecionado}>{anoSelecionado}</option>
              </select>
            </BotaoAno>
          </ContainerH2>
          <DivGraf>
            <DivStyle1>
              <h3>Produção por Tipo de Florada</h3>
              <Pie data={pieData} />
            </DivStyle1>
            <DivStyle2>
              <h3>Produção Mensal de Mel</h3>
              <Bar data={barData} />
            </DivStyle2>
            <button
            onClick={resetarGraficos}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#FF5733",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Resetar Gráficos
          </button>
          </DivGraf>
          <ContainerAdicionar>
            <StyledIcon onClick={() => setShowModal(true)} />
          </ContainerAdicionar>
          <ModalProducao isOpen={showModal} closeModalProducao={() => setShowModal(false)} />
        </DivPrincipal>
      </Main>
    </AppBody>
  );
};

export default Gestao;
