import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/HeaderPrincipal/index.js";
import Modal from "../../components/ModalColmeia/index.js";
import Campo from "../../assets/campo.png";
import Deposito from "../../assets/deposito.png";
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
  ContainerInform,
  ContainerDivider,
  ContainerDiv1,
  ContainerDiv2,
  ContainerText,
  StyledIcon,
  Icone,
  Total,
  TextImg
} from "./styles";

const Colmeias = () => {
  const [showModal, setShowModal] = useState(false);
  const { usuarioId } = useAuth();
  const [colmeias, setColmeias] = useState(() => {
    const savedData = localStorage.getItem("colmeias");
    return savedData
      ? JSON.parse(savedData)
      : {
          MELGUEIRA: { vazia: 0, em_campo: 0 },
          NINHO: { vazia: 0, em_campo: 0 },
          NUCLEO: { vazia: 0, em_campo: 0 },
        };
  });

  const totalEmCampo =
    colmeias?.NINHO?.em_campo + colmeias?.MELGUEIRA?.em_campo + colmeias?.NUCLEO?.em_campo;

  const totalVazia =
    colmeias?.NINHO?.vazia + colmeias?.MELGUEIRA?.vazia + colmeias?.NUCLEO?.vazia;

  useEffect(() => {
    if (!usuarioId) return; // Evita erros se o usuário não estiver autenticado

    const carregarColmeias = async () => {
      try {
        const response = await fetch(`https://projeto-full-stack-apiariopro.onrender.com/colmeias/${usuarioId}`);
        const data = await response.json();
        
        console.log("Resposta da API:", data); // Verifique o formato da resposta
    
        // Verifique se os dados possuem as propriedades em_campo e vazia
        if (data && data.em_campo && data.vazia) {
          // Reorganize os dados para o formato esperado
          const reorganizedData = {
            MELGUEIRA: { em_campo: data.em_campo.MELGUEIRA, vazia: data.vazia.MELGUEIRA },
            NINHO: { em_campo: data.em_campo.NINHO, vazia: data.vazia.NINHO },
            NUCLEO: { em_campo: data.em_campo.NUCLEO, vazia: data.vazia.NUCLEO }
          };
    
          setColmeias(reorganizedData);
        } else {
          console.error("Estrutura dos dados da API inválida:", data);
        }
      } catch (error) {
        console.error("Erro ao carregar colmeias:", error);
      }
    };
    

    carregarColmeias();
  }, [usuarioId]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddColmeia = ({ tipo_colmeia, quantidade, estado }) => {
    setColmeias((prevColmeias) => {
      const newColmeias = {
        ...prevColmeias,
        [tipo_colmeia]: {
          ...prevColmeias[tipo_colmeia],
          [estado.toLowerCase()]: parseInt(quantidade, 10),
        },
      };
      localStorage.setItem("colmeias", JSON.stringify(newColmeias));
      return newColmeias;
    });
  };

  return (
    <AppBody>
      <Header />

      <Main>
        <ContainerPrincipal>
          {/* Seção "Em Campo" */}
          <ContainerText>
            <TextImg>
              <Text>Em campo</Text> 
              <Icone src={Campo} alt={"campo"}/>
            </TextImg>
            <Total>Colméias: {totalEmCampo}</Total>
          </ContainerText>
          <ContainerDiv1>
            <Container>
              <BotaoContainer>
                <ContainerRow>
                  <ContainerInform>
                    <Informacoes>
                      <SectionColmeias>Ninhos</SectionColmeias>
                      <InfoItem>{colmeias?.NINHO?.em_campo || 0}</InfoItem>
                    </Informacoes>
                  </ContainerInform>
                  <ContainerInform>
                    <Informacoes>
                      <SectionColmeias>Melgueiras</SectionColmeias>
                      <InfoItem>{colmeias?.MELGUEIRA?.em_campo || 0}</InfoItem>
                    </Informacoes>
                  </ContainerInform>
                </ContainerRow>
                <ContainerInform>
                  <Informacoes>
                    <SectionColmeias>Núcleos</SectionColmeias>
                    <InfoItem>{colmeias?.NUCLEO?.em_campo || 0}</InfoItem>
                  </Informacoes>
                </ContainerInform>
              </BotaoContainer>
            </Container>
            <ContainerDivider />
          </ContainerDiv1>

          {/* Seção "Galpão" */}
          <ContainerDiv2>
            <ContainerText>
              <TextImg>
                <Text>Galpão</Text>
                <Icone src={Deposito} alt={"deposito"}/>
              </TextImg>
              <Total>Colméias: {totalVazia}</Total>
            </ContainerText>
            <BotaoContainer>
              <ContainerRow>
                <ContainerInform>
                  <Informacoes>
                    <SectionColmeias>Ninhos</SectionColmeias>
                    <InfoItem>{colmeias?.NINHO?.vazia || 0}</InfoItem>
                  </Informacoes>
                </ContainerInform>
                <ContainerInform>
                  <Informacoes>
                    <SectionColmeias>Melgueiras</SectionColmeias>
                    <InfoItem>{colmeias?.MELGUEIRA?.vazia || 0}</InfoItem>
                  </Informacoes>
                </ContainerInform>
              </ContainerRow>
              <ContainerInform>
                <Informacoes>
                  <SectionColmeias>Núcleos</SectionColmeias>
                  <InfoItem>{colmeias?.NUCLEO?.vazia || 0}</InfoItem>
                </Informacoes>
              </ContainerInform>
            </BotaoContainer>
          </ContainerDiv2>

          {/* Botão para adicionar colmeias */}
          <ContainerAdicionar>
            <StyledIcon onClick={toggleModal} />
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
