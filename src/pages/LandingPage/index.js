import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../../assets/apicultor.png";

import {
  AppBody,
  Header,
  H2,
  H1,
  Main,
  P1,
  Button,
  ContainerButton,
  ContainerTitulo,
  ContainerPrincipal,
  Container,
  Imagem,

} from './styles'; // Supondo que você tenha seus estilos em um arquivo separado

function Home() {
  
 
  const navigate = useNavigate();
  
  return (
    <AppBody>
      <Header>
        
      </Header>
      <Main>
      
        <ContainerPrincipal>
        <Imagem src={logo} alt={"apicultor"} />
          <Container>
            <ContainerTitulo>
                <H2>BEM-VINDO AO</H2>
          <H1>APIÁRIO PRO</H1>
          <P1>GERENCIA A SUA APICULTURA!</P1>
          </ContainerTitulo>
          <ContainerButton>
            <Button  onClick={() => navigate("/Login")}>LOGIN</Button>
            <Button onClick={() => navigate("/Cadastro")}>CADASTRE-SE</Button>
          </ContainerButton>
          
          </Container>
        </ContainerPrincipal>
      </Main>
      
    </AppBody>
  );
}

export default Home;
