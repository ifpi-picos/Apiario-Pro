import React, { useState, useEffect } from 'react';
import Header from "../../components/HeaderPrincipal/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/ModalApiario/index.js";
import axios from 'axios'; // Importar o axios para requisições
import { useAuth } from "../../contexts/AuthContext";
import {
  AppBody,
  Text,
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
  ContainerAdicionar,
  ContainerFlorada,
} from './styles';

function Apiarios() {
  const [showModal, setShowModal] = useState(false);
  const [apiarios, setApiarios] = useState([]);
  const { token } = useAuth(); // Acessa o token do contexto (se houver)

  // Carregar os apiários do back-end assim que o token estiver disponível
  useEffect(() => {
    const fetchApiarios = async () => {
      try {
        const storedToken = token || localStorage.getItem('token'); 
        if (!storedToken) return; 
  
        const response = await axios.get('https://projeto-full-stack-apiariopro.onrender.com/apiarios', {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
  
        console.log('Resposta da API:', response.data);  // Verifique a estrutura dos dados aqui
  
        setApiarios(response.data); // Atualiza o estado com os apiários recebidos
      } catch (error) {
        console.error("Erro ao buscar apiários:", error);
      }
    };
  
    fetchApiarios();
  }, [token]);
  
  // Função para adicionar um novo apiário
  const handleAddApiario = (novoApiario) => {
    setApiarios((prevApiarios) => {
      const updatedApiarios = [...prevApiarios, novoApiario];
      localStorage.setItem('apiarios', JSON.stringify(updatedApiarios));
      return updatedApiarios;
    });
  };

  // Função para excluir um apiário
  const handleDeleteApiario = async (id) => {
    try {
      const confirmacao = window.confirm("Tem certeza que deseja excluir este apiário?");
      if (confirmacao) {
        console.log(`Excluindo apiário com id: ${id}`);
        const storedToken = token || localStorage.getItem('token'); // Verifica se o token está no contexto ou no localStorage
        if (!storedToken) return; // Se não tiver token, não faz a requisição
  
        const response = await axios.delete(`https://projeto-full-stack-apiariopro.onrender.com/apiarios/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
  
        console.log('Resposta da exclusão:', response.data); // Verifique a resposta aqui
  
        // Atualiza o estado e o localStorage
        setApiarios(apiarios.filter(apiario => apiario.id !== id));
        localStorage.setItem("apiarios", JSON.stringify(apiarios.filter(apiario => apiario.id !== id))); // Atualiza o localStorage
      }
    } catch (erro) {
      console.error("Erro ao excluir o apiário:", erro);
    }
  };
  const [floradas, setFloradas] = useState([]);
  useEffect(() => {
    const fetchFloradas = async () => {
      try {
        const storedToken = token || localStorage.getItem('token'); 
        if (!storedToken) return; 
  
        const response = await axios.get('https://projeto-full-stack-apiariopro.onrender.com/floradas', {
          headers: { Authorization: `Bearer ${storedToken}` }
        });
  
        setFloradas(response.data); // Armazena as floradas na state
      } catch (error) {
        console.error("Erro ao buscar floradas:", error);
      }
    };
  
    fetchFloradas();
  }, [token]);
  

  return (
    <AppBody>
      <Header />
      <Main>
        <ContainerPrincipal>
          <Text>Apiários</Text>
          <Container>
            <BotaoContainer>
              {apiarios.map((apiario) => (
                <ContainerFlorada key={apiario.id}>
                  <Imagem src={apiario.imagem} alt="Apiário" />
                  <Informacoes>
                    <InfoItem>
                      <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Região: </span>
                      {apiario.regiao}
                    </InfoItem>
                    <InfoItem>
  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Florada: </span>
  {floradas.find(f => f.id === parseInt(apiario.florada))?.nome || "Desconhecida"}
</InfoItem>

                    <InfoItem>
                      <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Colmeias: </span>
                      {apiario.colmeias}
                    </InfoItem>
                  </Informacoes>
                  <AcoesContainer>
                    <AcaoBotao>
                      <FontAwesomeIcon icon={faEdit} />
                    </AcaoBotao>
                    <AcaoBotao onClick={() => handleDeleteApiario(apiario.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </AcaoBotao>
                  </AcoesContainer>
                </ContainerFlorada>
              ))}
            </BotaoContainer>
          </Container>
          <ContainerAdicionar>
            <StyledIcon onClick={() => setShowModal(true)} />
          </ContainerAdicionar>
          <Modal
            isOpen={showModal}
            closeModalApiario={() => setShowModal(false)}
            onAddApiario={handleAddApiario}
          />
        </ContainerPrincipal>
      </Main>
      <Footer />
    </AppBody>
  );
}

export default Apiarios;
