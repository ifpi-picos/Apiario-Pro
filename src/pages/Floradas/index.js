import React, { useState, useEffect} from 'react';

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
  ContainerEditar,
  StyledIcon2
} from './styles'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Floradas() {
  const [showModal, setShowModal] = useState(false);
  const [floradas, setFloradas] = useState([]); // Estado para armazenar as floradas

 useEffect(() => {
        const floradasSalvas = localStorage.getItem("floradas");
        if (floradasSalvas) {
            setFloradas(JSON.parse(floradasSalvas));
        }
    }, []);
    const handleAddFlorada= async (novaFlorada) => {
    

      // Atualizar o estado diretamente com o novo apiário
      const novasFloradas = [...floradas, novaFlorada];
      setFloradas(novasFloradas);

      // Salvar no localStorage
      localStorage.setItem("floradas", JSON.stringify(novasFloradas));
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleDeleteFlorada = (index) => {
    // Perguntar ao usuário se tem certeza
    const confirmacao = window.confirm("Tem certeza que deseja excluir esta florada?");
    
    if (confirmacao) {
        // Cria um novo array sem o apiário excluído
        const novasFloradas = floradas.filter((_, i) => i !== index);

        // Atualiza o estado local
        setFloradas(novasFloradas);

        // Atualiza o localStorage com os novos dados
        localStorage.setItem("floradas", JSON.stringify(novasFloradas));

        // Recarrega a página para refletir as mudanças no estado e no localStorage
        window.location.reload();
    }
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
      <StyledIcon2 icon={faChevronRight}/>
      </ContainerEditar>
                  </ContainerInform>
                  
                  <AcoesContainer>
                 
                    <AcaoBotao onClick={() => handleDeleteFlorada(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </AcaoBotao>
                   
                  </AcoesContainer>
                </ContainerFlorada>
              ))}
              <ContainerAdicionar>
                 <StyledIcon  onClick={toggleModal} /> 
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
