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
      const totalEmCampo = colmeias.NINHO.em_campo + colmeias.MELGUEIRA.em_campo + colmeias.NUCLEO.em_campo;
      const totalVazia = colmeias.NINHO.vazia + colmeias.MELGUEIRA.vazia + colmeias.NUCLEO.vazia;
      setTotalColmeias(totalEmCampo + totalVazia);
      setTotalEmCampo(totalEmCampo)
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
