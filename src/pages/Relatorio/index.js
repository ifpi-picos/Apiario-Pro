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


  useEffect(() => {
    const savedColmeias = localStorage.getItem("colmeias");
    if (savedColmeias) {
      const colmeias = JSON.parse(savedColmeias);
  
      // Garante que as propriedades existam antes de acessá-las
      const ninho = colmeias.NINHO || { em_campo: 0, vazia: 0 };
      const melgueira = colmeias.MELGUEIRA || { em_campo: 0, vazia: 0 };
      const nucleo = colmeias.NUCLEO || { em_campo: 0, vazia: 0 };
  
      const totalEmCampo = ninho.em_campo + melgueira.em_campo + nucleo.em_campo;
      const totalVazia = ninho.vazia + melgueira.vazia + nucleo.vazia;
  
      setTotalColmeias(totalEmCampo + totalVazia);
      setTotalEmCampo(totalEmCampo);
    }
  
    const savedApiarios = localStorage.getItem("apiarios");
    if (savedApiarios) {
      setTotalApiarios(JSON.parse(savedApiarios).length);
    }
  
    const savedMel = localStorage.getItem("dadosProducao");
    if (savedMel) {
      const dados = JSON.parse(savedMel);
      const total = dados.reduce((acc, item) => acc + Number(item.quantidade_florada || 0), 0);
      setTotalMel(total);
    }
  }, []);
  
  

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
