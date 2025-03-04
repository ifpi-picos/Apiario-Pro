import React, { useState, useEffect } from 'react';
import Header from "../../components/HeaderPrincipal/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/ModalApiario/index.js";

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

    // Carregar os dados salvos no localStorage ao iniciar
    useEffect(() => {
        const apiariosSalvos = localStorage.getItem("apiarios");
        if (apiariosSalvos) {
            setApiarios(JSON.parse(apiariosSalvos));
        }
    }, []);

    // Função para converter a imagem em Base64
    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Função para adicionar um novo apiário
    const handleAddApiario = async (novoApiario) => {
        if (novoApiario.imagem) {
            novoApiario.imagem = await toBase64(novoApiario.imagem);
        }
        
        // Atualizar o estado diretamente com o novo apiário
        const novosApiarios = [...apiarios, novoApiario];
        setApiarios(novosApiarios);

        // Salvar no localStorage
        localStorage.setItem("apiarios", JSON.stringify(novosApiarios));
    };

    // Função para excluir um apiário
    const handleDeleteApiario = (index) => {
        // Perguntar ao usuário se tem certeza
        const confirmacao = window.confirm("Tem certeza que deseja excluir este apiário?");
        
        if (confirmacao) {
            // Cria um novo array sem o apiário excluído
            const novosApiarios = apiarios.filter((_, i) => i !== index);

            // Atualiza o estado local
            setApiarios(novosApiarios);

            // Atualiza o localStorage com os novos dados
            localStorage.setItem("apiarios", JSON.stringify(novosApiarios));

            // Recarrega a página para refletir as mudanças no estado e no localStorage
            window.location.reload();
        }
    };

    return (
        <AppBody>
            <Header />
            <Main>
                <ContainerPrincipal>
                    <Text>Apiários</Text>
                    <Container>
                        <BotaoContainer>
                            {apiarios.map((apiario, index) => (
                                <ContainerFlorada key={index}>
                                    <Imagem src={apiario.imagem} alt="Apiário" />
                                    <Informacoes>
                                        <InfoItem>
                                            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Região: </span>
                                            {apiario.regiao}
                                        </InfoItem>
                                        <InfoItem>
                                            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Florada: </span>
                                            {apiario.florada}
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
                                        <AcaoBotao onClick={() => handleDeleteApiario(index)}>
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
