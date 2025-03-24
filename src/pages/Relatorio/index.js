import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderPrincipal/index.js";
import { 
  AppBody, 
  Main, 
  ReportContainer, 
  ReportItem, 
  ReportTitle, 
  ReportValue 
} from "./styles";

const Relatorio = () => {
  const [totalApiarios, setTotalApiarios] = useState(0);
  const [totalColmeias, setTotalColmeias] = useState(0);
  const [totalMel, setTotalMel] = useState(0);
  const [totalEmCampo, setTotalEmCampo] = useState(0); // Novo estado
  const [usuarioId, setUsuarioId] = useState(null); // Estado para armazenar o ID do usuário
  useEffect(() => {
    // Obtendo o usuarioId do localStorage ou outro método de autenticação
    const storedUsuarioId = localStorage.getItem('usuarioId');
    if (storedUsuarioId) {
      setUsuarioId(storedUsuarioId);
    } else {
      console.error("Usuário não encontrado. O usuarioId não está presente no localStorage.");
      // Aqui você pode redirecionar o usuário para a tela de login, por exemplo:
      // window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    if (!usuarioId) return; // Evita fazer a requisição se o usuarioId não estiver disponível

    // Requisição para obter os dados de colmeias do banco de dados
    const fetchData = async () => {
      try {
        const colmeiasResponse = await fetch(`https://projeto-full-stack-apiariopro.onrender.com/colmeias/${usuarioId}`);
        const colmeiasData = await colmeiasResponse.json();
        
        const apiariosResponse = await fetch("/apiarios"); // Endpoint para apiários
        const apiariosData = await apiariosResponse.json();

        const melResponse = await fetch("/mel"); // Endpoint para produção de mel
        const melData = await melResponse.json();

        // Processando os dados de colmeias
        const ninho = colmeiasData.NINHO || { em_campo: 0, vazia: 0 };
        const melgueira = colmeiasData.MELGUEIRA || { em_campo: 0, vazia: 0 };
        const nucleo = colmeiasData.NUCLEO || { em_campo: 0, vazia: 0 };

        const totalEmCampo = ninho.em_campo + melgueira.em_campo + nucleo.em_campo;
        const totalVazia = ninho.vazia + melgueira.vazia + nucleo.vazia;

        setTotalColmeias(totalEmCampo + totalVazia);
        setTotalEmCampo(totalEmCampo);

        // Atualizando os estados com os dados de apiários
        setTotalApiarios(apiariosData.length);

        // Calculando o total de mel
        const totalMel = melData.reduce((acc, item) => acc + Number(item.quantidade_florada || 0), 0);
        setTotalMel(totalMel);
        
      } catch (error) {
        console.error("Erro ao buscar os dados do banco: ", error);
      }
    };

    fetchData();
  }, [usuarioId]);

  return (
    <AppBody>
      <Header />
      <Main>
        <ReportContainer>
          <ReportItem>
            <ReportTitle>Total de Apiários</ReportTitle>
            <ReportValue>{totalApiarios}</ReportValue>
          </ReportItem>
          
          <ReportItem>
            <ReportTitle>Total de colméias</ReportTitle>
            <ReportValue>{totalColmeias}</ReportValue>
          </ReportItem>

          <ReportItem>
            <ReportTitle>Total produção de mel(kg): </ReportTitle>
            <ReportValue>{totalMel.toFixed(2)}</ReportValue>
          </ReportItem>
        </ReportContainer>
      </Main>
    </AppBody>
  );
};

export default Relatorio;
