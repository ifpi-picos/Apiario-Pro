import React, { useState } from 'react';

import Header from "../../components/HeaderPrincipal/index.js";
import Apiario from "../../assets/foto5.jpg";
import Apiario2 from "../../assets/foto6.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  AppBody,
 Text,
  Botao,
  BotaoTexto,
  BotaoContainer,
  Main,
  StyledIcon,
  Container,
  ContainerPrincipal,
  Footer,
  Imagem,
  Informacoes,
  InfoItem,
  AcoesContainer,
  AcaoBotao,
  Button,
  ContainerAdicionar,
  ButtonAdicionar,


 
} from './styles'; // Supondo que você tenha seus estilos em um arquivo separado


function Apiarios() {
  
 

  
  return (
    <AppBody>
      
      <Header/>
      
      <Main>
      <ContainerPrincipal>
      <Text>
           Apiários
          </Text>
        <Container>
          
        <BotaoContainer>
    <Botao>
    <Imagem src={Apiario2} alt={"apiario"} />
      <Informacoes>
      <InfoItem>Região: Fazenda Planalto</InfoItem>
        <InfoItem>Florada: Angico</InfoItem>
        <InfoItem>Colmeias: 250</InfoItem>
        <InfoItem>Coordenada: xxxxxxxxxx</InfoItem>
      </Informacoes>
      <AcoesContainer>
    <AcaoBotao>
      <FontAwesomeIcon icon={faEdit} />
    </AcaoBotao>
    <AcaoBotao>
      <FontAwesomeIcon icon={faTrash} />
    </AcaoBotao>
  </AcoesContainer>
    </Botao>
    <Botao>
    <Imagem src={Apiario} alt={"apiario"} />
      <Informacoes>
        <InfoItem>Região: Serrolandia</InfoItem>
        <InfoItem>Florada: Vassourinha</InfoItem>
        <InfoItem>Colmeias: 150</InfoItem>
        <InfoItem>Coordenada: xxxxxxxxxx</InfoItem>
      </Informacoes>
      <AcoesContainer>
    <AcaoBotao>
      <FontAwesomeIcon icon={faEdit} />
    </AcaoBotao>
    <AcaoBotao>
      <FontAwesomeIcon icon={faTrash} />
    </AcaoBotao>
  </AcoesContainer>
    </Botao>
    <Botao>
    <Imagem src={Apiario2} alt={"apiario"} />
      <Informacoes>
      <InfoItem>Região: Fazenda Planalto</InfoItem>
        <InfoItem>Florada: Angico</InfoItem>
        <InfoItem>Colmeias: 250</InfoItem>
        <InfoItem>Coordenada: xxxxxxxxxx</InfoItem>
      </Informacoes>
      <AcoesContainer>
    <AcaoBotao>
      <FontAwesomeIcon icon={faEdit} />
    </AcaoBotao>
    <AcaoBotao>
      <FontAwesomeIcon icon={faTrash} />
    </AcaoBotao>
  </AcoesContainer>
    </Botao>
    <Botao>
    <Imagem src={Apiario} alt={"apiario"} />
      <Informacoes>
        <InfoItem>Região: Serrolandia</InfoItem>
        <InfoItem>Florada: Vassourinha</InfoItem>
        <InfoItem>Colmeias: 150</InfoItem>
        <InfoItem>Coordenada: xxxxxxxxxx</InfoItem>
      </Informacoes>
    </Botao>
    <Botao>
    <Imagem src={Apiario2} alt={"apiario"} />
      <Informacoes>
      <InfoItem>Região: Fazenda Planalto</InfoItem>
        <InfoItem>Florada: Angico</InfoItem>
        <InfoItem>Colmeias: 250</InfoItem>
        <InfoItem>Coordenada: xxxxxxxxxx</InfoItem>
      </Informacoes>
    </Botao>
    <Botao>
    <Imagem src={Apiario2} alt={"apiario"} />
      <Informacoes>
      <InfoItem>Região: Fazenda Planalto</InfoItem>
        <InfoItem>Florada: Angico</InfoItem>
        <InfoItem>Colmeias: 250</InfoItem>
        <InfoItem>Coordenada: xxxxxxxxxx</InfoItem>
      </Informacoes>
    </Botao>
  </BotaoContainer>
      </Container>
      <ContainerAdicionar>
        <ButtonAdicionar></ButtonAdicionar>
      </ContainerAdicionar>
        </ContainerPrincipal>
      </Main>
      <Footer></Footer>
    </AppBody>
  );
}

export default Apiarios;