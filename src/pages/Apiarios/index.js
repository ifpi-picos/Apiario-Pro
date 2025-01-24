import React, { useState } from 'react';

import Header from "../../components/HeaderPrincipal/index.js";
import Apiario from "../../assets/foto5.jpg";
import Apiario2 from "../../assets/foto6.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/ModalApiario/index.js";

import {
  AppBody,
 Text,

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
  ContainerFlorada,


 
} from './styles'; // Supondo que você tenha seus estilos em um arquivo separado



function Apiarios() {
    const [showModal, setShowModal] = useState(false);
    
  const toggleModal = () => {
    setShowModal(!showModal);
  };
 

  
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
    <ContainerFlorada>
    <Imagem src={Apiario2} alt={"apiario"} />
      <Informacoes>
      <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Região: </span>Serrolandia</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Florada: </span> Vassourinha</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Colmeias: </span> 150</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Coordenada: </span> xxxxxxxxxx</InfoItem>
      </Informacoes>
      <AcoesContainer>
    <AcaoBotao>
      <FontAwesomeIcon icon={faEdit} />
    </AcaoBotao>
    <AcaoBotao>
      <FontAwesomeIcon icon={faTrash} />
    </AcaoBotao>
  </AcoesContainer>
    </ContainerFlorada>
    <ContainerFlorada>
    <Imagem src={Apiario} alt={"apiario"} />
      <Informacoes>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Região: </span>Serrolandia</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Florada: </span> Vassourinha</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Colmeias: </span> 150</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Coordenada: </span> xxxxxxxxxx</InfoItem>
      </Informacoes>
      <AcoesContainer>
    <AcaoBotao>
      <FontAwesomeIcon icon={faEdit} />
    </AcaoBotao>
    <AcaoBotao>
      <FontAwesomeIcon icon={faTrash} />
    </AcaoBotao>
  </AcoesContainer>
    </ContainerFlorada>
    <ContainerFlorada>
    <Imagem src={Apiario2} alt={"apiario"} />
      <Informacoes>
      <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Região: </span>Serrolandia</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Florada: </span> Vassourinha</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Colmeias: </span> 150</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Coordenada: </span> xxxxxxxxxx</InfoItem>
      </Informacoes>
      <AcoesContainer>
    <AcaoBotao>
      <FontAwesomeIcon icon={faEdit} />
    </AcaoBotao>
    <AcaoBotao>
      <FontAwesomeIcon icon={faTrash} />
    </AcaoBotao>
  </AcoesContainer>
    </ContainerFlorada>
    <ContainerFlorada>
    <Imagem src={Apiario} alt={"apiario"} />
      <Informacoes>
      <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Região: </span>Serrolandia</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Florada: </span> Vassourinha</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Colmeias: </span> 150</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Coordenada: </span> xxxxxxxxxx</InfoItem>
      </Informacoes>
    </ContainerFlorada>
    <ContainerFlorada>
    <Imagem src={Apiario2} alt={"apiario"} />
      <Informacoes>
      <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Região: </span>Serrolandia</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Florada: </span> Vassourinha</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Colmeias: </span> 150</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Coordenada: </span> xxxxxxxxxx</InfoItem>
      </Informacoes>
    </ContainerFlorada>
    <ContainerFlorada>
    <Imagem src={Apiario2} alt={"apiario"} />
      <Informacoes>
      <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Região: </span>Serrolandia</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Florada: </span> Vassourinha</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Colmeias: </span> 150</InfoItem>
        <InfoItem> <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Coordenada: </span> xxxxxxxxxx</InfoItem>
      </Informacoes>
    </ContainerFlorada>
  </BotaoContainer>
      </Container>
      <ContainerAdicionar>
         <StyledIcon  onClick={toggleModal} /> 
         
      </ContainerAdicionar>
      <Modal
            isOpen={showModal}
            closeModalApiario={toggleModal}
           
          />
        </ContainerPrincipal>
      </Main>
      <Footer></Footer>
    </AppBody>
  );
}

export default Apiarios;