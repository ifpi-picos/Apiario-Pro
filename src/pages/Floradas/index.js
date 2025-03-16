import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/HeaderPrincipal/index.js";
import Modal from "../../components/ModalFlorada/index.js";
import { useAuth } from "../../contexts/AuthContext";
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
  ContainerInform,
  StyledIcon,
  ContainerEditar,
  StyledIcon2
} from './styles'; // Os seus componentes styled

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Floradas() {
  const [showModal, setShowModal] = useState(false);
  const [floradas, setFloradas] = useState([]); // Estado para armazenar as floradas
  const { token } = useAuth(); // Acessar o token do contexto

  // Carregar as floradas do back-end assim que o token estiver disponível
  useEffect(() => {
    if (token) {
      axios
      .get(`https://projeto-full-stack-apiariopro.onrender.com/floradas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFloradas(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar floradas:", error);
        });
    }
  }, [token]); // Executa a busca sempre que o token mudar

  const handleAddFlorada = (novaFlorada) => {
    setFloradas((prevFloradas) => [...prevFloradas, novaFlorada]);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDeleteFlorada = (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir esta florada?");
    if (confirmacao) {
      axios
      .delete(`https://projeto-full-stack-apiariopro.onrender.com/floradas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setFloradas(floradas.filter((florada) => florada.id !== id));
        })
        .catch((error) => {
          console.error("Erro ao excluir a florada:", error);
        });
    }
  };

  return (
    <AppBody>
      <Header />
      <Main>
        <ContainerPrincipal>
          <Text>Floradas</Text>
          <Container>
            <BotaoContainer>
              {floradas.map((florada) => (
                <ContainerFlorada key={florada.id}>
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
                      <StyledIcon2 icon={faChevronRight} />
                    </ContainerEditar>
                  </ContainerInform>

                  <AcoesContainer>
                    <AcaoBotao onClick={() => handleDeleteFlorada(florada.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </AcaoBotao>
                  </AcoesContainer>
                </ContainerFlorada>
              ))}

              <ContainerAdicionar>
                <StyledIcon onClick={toggleModal} />
              </ContainerAdicionar>
            </BotaoContainer>

            <Modal
              isOpen={showModal}
              closeModalFlorada={toggleModal}
              onAddFlorada={handleAddFlorada}
              token={token} // Passando o token para o Modal, caso precise para validação ou criação
            />
          </Container>
        </ContainerPrincipal>
      </Main>
      <Footer></Footer>
    </AppBody>
  );
}

export default Floradas;
