import React, { useState, useEffect } from "react"; 
import axios from "axios";
import Header from "../../components/HeaderPrincipal/index.js";
import { AppBody, Main, ReportContainer, ReportItem, ReportTitle, ReportValue } from "./styles";
import { useAuth } from "../../contexts/AuthContext.js";

const Relatorio = () => {
  const [totalMel, setTotalMel] = useState(0);  // Total de mel produzido
  const [totalColmeias, setTotalColmeias] = useState(0);  // Total de colmeias
  const [totalApiarios, setTotalApiarios] = useState(0); // Total de apiários
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const { token, usuarioId } = useAuth();  // Recuperando do contexto
  const API_URL = "https://projeto-full-stack-apiariopro.onrender.com/gestao";
  const COLMEIAS_URL = "https://projeto-full-stack-apiariopro.onrender.com/colmeias";
  const APIARIOS_URL = "https://projeto-full-stack-apiariopro.onrender.com/apiarios";

  // Função para buscar os dados de produção de mel
  const fetchMelData = async () => {
    try {
      if (!token) {
        console.error("Token não encontrado.");
        return;
      }

      const responseMel = await axios.get(`${API_URL}/${anoSelecionado}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const melData = responseMel.data;
      const total = melData.reduce((acc, item) => acc + Number(item.quantidade_florada || 0), 0);
      setTotalMel(total);  // Somando todas as produções de mel para o ano selecionado

    } catch (error) {
      console.error("Erro ao buscar dados de mel:", error);
      alert("Erro ao buscar produções de mel para este ano.");
    }
  };

  // Função para buscar os dados das colmeias
  const fetchColmeiasData = async () => {
    try {
      if (!token || !usuarioId) {
        console.error("Token ou usuarioId não disponíveis.");
        return;
      }

      const responseColmeias = await axios.get(`${COLMEIAS_URL}/${usuarioId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const colmeiasData = responseColmeias.data;

      if (colmeiasData && colmeiasData.em_campo && colmeiasData.vazia) {
        const totalEmCampo = Object.values(colmeiasData.em_campo).reduce(
          (acc, tipo) => acc + (tipo || 0), 
          0
        );
        const totalVazias = Object.values(colmeiasData.vazia).reduce(
          (acc, tipo) => acc + (tipo || 0), 
          0
        );

        const totalColmeias = totalEmCampo + totalVazias;
        setTotalColmeias(totalColmeias);  // Atualizar o total de colmeias
      } else {
        console.error("Estrutura dos dados das colmeias inválida:", colmeiasData);
      }

    } catch (error) {
      console.error("Erro ao buscar dados de colmeias:", error);
      alert("Erro ao buscar colmeias para este ano.");
    }
  };

  // Função para buscar os dados de apiários
  const fetchApiariosData = async () => {
    try {
      if (!token) {
        console.error("Token não encontrado.");
        return;
      }

      const responseApiarios = await axios.get(`${APIARIOS_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTotalApiarios(responseApiarios.data.length);  // O total de apiários pode ser o tamanho da resposta (um array de apiários)

    } catch (error) {
      console.error("Erro ao buscar dados de apiários:", error);
      alert("Erro ao buscar apiários para este ano.");
    }
  };

  // useEffect para buscar os dados assim que o componente for montado ou o ano selecionado for alterado
  useEffect(() => {
    if (token && usuarioId) {
      fetchMelData();
      fetchColmeiasData();
      fetchApiariosData();
    }
  }, [token, usuarioId, anoSelecionado]);  // Atualiza os dados sempre que o token ou usuarioId mudar

  return (
    <AppBody>
      <Header />
      <Main>
        <ReportContainer>
          <ReportItem>
            <ReportTitle>Total de produção de mel (kg)</ReportTitle>
            <ReportValue>{totalMel.toFixed(2)}</ReportValue>
          </ReportItem>
          <ReportItem>
            <ReportTitle>Total de colmeias</ReportTitle>
            <ReportValue>{totalColmeias}</ReportValue>
          </ReportItem>
          <ReportItem>
            <ReportTitle>Total de apiários</ReportTitle>
            <ReportValue>{totalApiarios}</ReportValue>
          </ReportItem>
        </ReportContainer>
      </Main>
    </AppBody>
  );
};

export default Relatorio;
