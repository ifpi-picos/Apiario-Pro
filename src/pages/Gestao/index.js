import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import Header from "../../components/HeaderPrincipal/index.js";
import ModalProducao from "../../components/ModalProducao/index.js";
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

const Gestao = () => {
  const [showModal, setShowModal] = useState(false);
  const [dadosProducao, setDadosProducao] = useState(() => {
    // Tentar carregar os dados do localStorage na inicialização
    const dadosSalvos = localStorage.getItem("dadosProducao");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  // Atualizar o localStorage sempre que os dados mudarem
  useEffect(() => {
    if (dadosProducao.length > 0) {
      localStorage.setItem("dadosProducao", JSON.stringify(dadosProducao));
    }
  }, [dadosProducao]);

  const resetarGraficos = () => {
    setDadosProducao([]);
    localStorage.removeItem("dadosProducao"); // Remover do localStorage
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const adicionarProducao = (novaProducao) => {
    setDadosProducao((prevState) => [...prevState, novaProducao]);
  };

  // Agrupar produção por florada
  const dadosFlorada = dadosProducao.reduce((acc, item) => {
    acc[item.florada] = (acc[item.florada] || 0) + Number(item.quantidade_florada);
    return acc;
  }, {});

  // Preparar dados para o gráfico de pizza
  const pieData = dadosProducao.length > 0 ? {
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

  // Agrupar produção por mês
  const dadosMensais = dadosProducao.reduce((acc, item) => {
    acc[item.mes] = (acc[item.mes] || 0) + Number(item.quantidade_mes);
    return acc;
  }, {});

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Preparar dados para o gráfico de barras
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

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Produção de Mel por Mês",
      },
    },
  };

  return (
    <AppBody>
      <Header />
      <Main>
        <DivPrincipal>
          <ContainerH2>
            <h2 style={{ textAlign: "center" }}>Gestão de Produção de Mel - Análise de Gráficos</h2>
            <BotaoAno>
              <select
                name="ano"
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Selecione o ano</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
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
              <Bar data={barData} options={barOptions} />
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
            <StyledIcon onClick={toggleModal} />
          </ContainerAdicionar>
          <ModalProducao
            isOpen={showModal}
            closeModalProducao={() => setShowModal(false)}
            onAddProducao={adicionarProducao}
          />
        </DivPrincipal>
      </Main>
    </AppBody>
  );
};

export default Gestao;
