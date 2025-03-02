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
        const novosApiarios = [...apiarios, novoApiario];
        setApiarios(novosApiarios);
        localStorage.setItem("apiarios", JSON.stringify(novosApiarios));
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
                                        <AcaoBotao>
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
