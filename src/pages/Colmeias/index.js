import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/HeaderPrincipal/index.js";
import Modal from "../../components/ModalColmeia/index.js";
import {
  AppBody,
  Text,
  BotaoContainer,
  Main,
  Container,
  ContainerPrincipal,
  SectionColmeias,
  Informacoes,
  InfoItem,
  ContainerRow,
  ContainerAdicionar,
  ButtonAdicionar,
  ContainerInform,
  ContainerDivider,
  ContainerDiv1,
  ContainerDiv2,
  ContainerText,
} from "./styles";

const Colmeias = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [colmeias, setColmeias] = useState(location.state?.colmeias || {
    MELGUEIRA: { vazia: 0, em_campo: 0 },
    NINHO: { vazia: 0, em_campo: 0 },
    NUCLEO: { vazia: 0, em_campo: 0 },
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddColmeia = ({ tipo_colmeia, quantidade, estado }) => {
    setColmeias((prevColmeias) => ({
      ...prevColmeias,
      [tipo_colmeia]: {
        ...prevColmeias[tipo_colmeia],
        [estado.toLowerCase()]: prevColmeias[tipo_colmeia][estado.toLowerCase()] + parseInt(quantidade, 10),
      },
    }));
  };

  return (
    <AppBody>
      <Header />

      <Main>
        <ContainerPrincipal>
          {/* Seção "Em Campo" */}
          <ContainerDiv1>
            <ContainerText>
              <Text>Em campo</Text>
            </ContainerText>
            <Container>
              <BotaoContainer>
                <ContainerRow>
                  <ContainerInform>
                    <Informacoes>
                      <SectionColmeias>Ninho</SectionColmeias>
                      <InfoItem>{colmeias.NINHO.em_campo}</InfoItem>
                    </Informacoes>
                  </ContainerInform>
                  <ContainerInform>
                    <Informacoes>
                      <SectionColmeias>Melgueiras</SectionColmeias>
                      <InfoItem>{colmeias.MELGUEIRA.em_campo}</InfoItem>
                    </Informacoes>
                  </ContainerInform>
                </ContainerRow>
                <ContainerInform>
                  <Informacoes>
                    <SectionColmeias>Núcleos</SectionColmeias>
                    <InfoItem>{colmeias.NUCLEO.em_campo}</InfoItem>
                  </Informacoes>
                </ContainerInform>
              </BotaoContainer>
            </Container>
            <ContainerDivider />
          </ContainerDiv1>

          {/* Seção "Vazia" */}
          <ContainerDiv2>
            <ContainerText>
              <Text>Vazia</Text>
            </ContainerText>
            <BotaoContainer>
              <ContainerRow>
                <ContainerInform>
                  <Informacoes>
                    <SectionColmeias>Ninho</SectionColmeias>
                    <InfoItem>{colmeias.NINHO.vazia}</InfoItem>
                  </Informacoes>
                </ContainerInform>
                <ContainerInform>
                  <Informacoes>
                    <SectionColmeias>Melgueiras</SectionColmeias>
                    <InfoItem>{colmeias.MELGUEIRA.vazia}</InfoItem>
                  </Informacoes>
                </ContainerInform>
              </ContainerRow>
              <ContainerInform>
                <Informacoes>
                  <SectionColmeias>Núcleos</SectionColmeias>
                  <InfoItem>{colmeias.NUCLEO.vazia}</InfoItem>
                </Informacoes>
              </ContainerInform>
            </BotaoContainer>
          </ContainerDiv2>

          {/* Botão para adicionar colmeias */}
          <ContainerAdicionar>
            <ButtonAdicionar onClick={toggleModal}>
              
            </ButtonAdicionar>
          </ContainerAdicionar>

          {/* Modal para adicionar novas colmeias */}
          <Modal
            isOpen={showModal}
            closeModalColmeia={toggleModal}
            onAddColmeia={handleAddColmeia}
          />
        </ContainerPrincipal>
      </Main>
    </AppBody>
  );
};

export default Colmeias;
