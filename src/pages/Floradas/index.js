import React, { useState } from 'react';

import Header from "../../components/HeaderPrincipal/index.js";
import Apiario from "../../assets/foto5.jpg";
import Apiario2 from "../../assets/foto6.jpg";

import {
  AppBody,
 Text,
  Botao,
  BotaoContainer,
  Main,
  Container,
  ContainerPrincipal,
  Footer,
  Florada,
  Informacoes,
  InfoItem,
  AcoesContainer,
  AcaoBotao,
  ContainerAdicionar,
  ButtonAdicionar,
  ContainerEditar,
  ContainerInform,
  StyledIcon

} from './styles'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faChevronRight } from "@fortawesome/free-solid-svg-icons";


function Home() {
  
 

  
  return (
    <AppBody>
      
      <Header/>
      
      <Main>
      <ContainerPrincipal>
      <Text>
           Floradas
          </Text>
        <Container>
          
        <BotaoContainer>
    <Botao>
    <ContainerInform>
    <Informacoes>
    <Florada>Marmeleiro</Florada>
        <InfoItem>Inicio: Janeiro</InfoItem>
        <InfoItem>Fim: Fevereiro</InfoItem>
      </Informacoes>
      <ContainerEditar>
      <StyledIcon icon={faChevronRight}/>
      </ContainerEditar>
      </ContainerInform>
      <AcoesContainer>
          
          <AcaoBotao>
            <FontAwesomeIcon icon={faTrash} />
          </AcaoBotao>
        </AcoesContainer>
    </Botao>
    <Botao>
    <ContainerInform>
    <Informacoes>
    <Florada>Angico</Florada>
        <InfoItem>Inicio: Janeiro</InfoItem>
        <InfoItem>Fim: Fevereiro</InfoItem>
      </Informacoes>
      <ContainerEditar>
      <StyledIcon icon={faChevronRight}/>
      </ContainerEditar>
      </ContainerInform>
      <AcoesContainer>
     
          <AcaoBotao>
            <FontAwesomeIcon icon={faTrash} />
          </AcaoBotao>
        </AcoesContainer>
    </Botao>
    <Botao>
    <ContainerInform>
    <Informacoes>
    <Florada>Vassourinha</Florada>
        <InfoItem>Inicio: Janeiro</InfoItem>
        <InfoItem>Fim: Fevereiro</InfoItem>
      </Informacoes>
      <ContainerEditar>
      <StyledIcon icon={faChevronRight}/>
      </ContainerEditar>
      </ContainerInform>
      <AcoesContainer>
          
          <AcaoBotao>
            <FontAwesomeIcon icon={faTrash} />
          </AcaoBotao>
        </AcoesContainer>
    </Botao>
      <ContainerAdicionar>
              <ButtonAdicionar></ButtonAdicionar>
            </ContainerAdicionar>
  </BotaoContainer>
    
      </Container>
        </ContainerPrincipal>
      </Main>
      <Footer></Footer>
    </AppBody>
  );
}

export default Home;