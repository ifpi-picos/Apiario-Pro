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

  // Carregar as floradas do back-end ou do localStorage assim que o token estiver disponível
  useEffect(() => {
    const fetchFloradas = async () => {
      try {
        const storedToken = token || localStorage.getItem('token'); // Verifica se o token está no contexto ou no localStorage
        if (!storedToken) return; // Se não tiver token, não faz a requisição

        const response = await axios.get('https://projeto-full-stack-apiariopro.onrender.com/floradas', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });

        setFloradas(response.data); // Atualiza o estado com as floradas
      } catch (error) {
        console.error("Erro ao buscar floradas:", error);
      }
    };

    fetchFloradas(); // Chama a função quando o token estiver disponível
  }, [token]); 
  // Função para adicionar uma florada
  const handleAddFlorada = (novaFlorada) => {
    setFloradas((prevFloradas) => {
      const updatedFloradas = [...prevFloradas, novaFlorada];
      // Salvar as floradas no localStorage
      localStorage.setItem('floradas', JSON.stringify(updatedFloradas));
      return updatedFloradas;
    });
  };

  // Função para excluir uma florada
  const handleDeleteFlorada = async (id) => {
    try {
      const confirmacao = window.confirm("Tem certeza que deseja excluir esta florada?");
      if (confirmacao) {
        console.log(`Excluindo florada com id: ${id}`);
        const storedToken = token || localStorage.getItem('token'); // Verifica se o token está no contexto ou no localStorage
        if (!storedToken) return; // Se não tiver token, não faz a requisição
        const response = await axios.delete(`https://projeto-full-stack-apiariopro.onrender.com/floradas/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
  
        console.log('Resposta da exclusão:', response.data); // Verifique a resposta aqui
  
        // Atualiza o estado e o localStorage
        setFloradas(floradas.filter(florada => florada.id !== id));
        localStorage.setItem("floradas", JSON.stringify(floradas.filter(florada => florada.id !== id))); // Atualiza o localStorage
      }
    } catch (erro) {
      console.error("Erro ao excluir a florada:", erro);
    }
  };
  
  
  // Abrir/fechar a modal
  const toggleModal = () => {
    setShowModal(!showModal);
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
    
    </AppBody>
  );
}

export default Floradas;
