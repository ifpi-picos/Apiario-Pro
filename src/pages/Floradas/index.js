import React, { useState } from 'react';

import Header from "../../components/HeaderPrincipal/index.js";
import Modal from "../../components/ModalFlorada/index.js";

import {
  AppBody,
  Text,
  ContainerFlorada,
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
  ContainerInform,
  StyledIcon,
  ContainerEditar
} from './styles'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Floradas() {
  const [showModal, setShowModal] = useState(false);
  const [floradas, setFloradas] = useState([]); // Estado para armazenar as floradas

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddFlorada = (novaFlorada) => {
    setFloradas((prevFloradas) => [...prevFloradas, novaFlorada]); // Adiciona a nova florada ao estado
  };

  return (
    <AppBody>
      <Header/>
      <Main>
        <ContainerPrincipal>
          <Text>Floradas</Text>
          <Container>
            <BotaoContainer>
              {floradas.map((florada, index) => ( // Renderiza as floradas adicionadas
                <ContainerFlorada key={index}>
                  <ContainerInform>
                    
                    <Informacoes>
                    <Florada>{florada.nome}</Florada>
                    <InfoItem>
                      <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Inicio:</span> {florada.data_inicio}
                    </InfoItem>
                    <InfoItem>
                      <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Fim:</span> {florada.data_fim}
                    </InfoItem>
                      
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
                </ContainerFlorada>
              ))}
              <ContainerAdicionar>
                <ButtonAdicionar onClick={toggleModal}></ButtonAdicionar>
              </ContainerAdicionar>
            </BotaoContainer>
            <Modal
              isOpen={showModal}
              closeModalFlorada={toggleModal}
              onAddFlorada={handleAddFlorada} // Passa a função para adicionar florada
            />
          </Container>
        </ContainerPrincipal>
      </Main>
      <Footer></Footer>
    </AppBody>
  );
}

export default Floradas;
