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
  const [editando, setEditando] = useState(null);
  const [novoValor, setNovoValor] = useState("");

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

  useEffect(() => {
    if (!usuarioId) return;

    const carregarColmeias = async () => {
      try {
        const response = await fetch(
          `https://projeto-full-stack-apiariopro.onrender.com/colmeias/${usuarioId}`
        );
        const data = await response.json();

        if (data && data.em_campo && data.vazia) {
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

  const handleEditClick = (tipo, estado) => {
    setEditando({ tipo, estado });
    setNovoValor(colmeias[tipo][estado]); // Define o valor atual no input
  };

  const handleChange = (e) => {
    setNovoValor(e.target.value.replace(/\D/, "")); // Aceita apenas números
  };

  const handleBlurOrEnter = async () => {
    if (!editando) return;
  
    const { tipo, estado } = editando;
    const quantidade = parseInt(novoValor, 10) || 0;
  
    try {
      // Atualizar o estado local
      setColmeias((prev) => ({
        ...prev,
        [tipo]: { ...prev[tipo], [estado]: quantidade },
      }));
  
      // Atualizar o banco de dados
      await fetch(`https://projeto-full-stack-apiariopro.onrender.com/colmeias/atualizar/${usuarioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo, estado, quantidade }),
      });
  
      // Salvar os dados atualizados no localStorage após a atualização
      localStorage.setItem(
        "colmeias",
        JSON.stringify({ ...colmeias, [tipo]: { ...colmeias[tipo], [estado]: quantidade } })
      );
    } catch (error) {
      console.error("Erro ao salvar a quantidade no banco:", error);
    }
  
    setEditando(null);
  };
  
  const onAddColmeia = (colmeia) => {
    setColmeias((prevColmeias) => {
      const tipo = colmeia.tipo_colmeia;
      const estado = colmeia.estado.toLowerCase();
      const quantidadeNova = parseInt(colmeia.quantidade, 10); // Garantir que seja um número
  
      // Se já existir colmeia do mesmo tipo e estado, somamos as quantidades
      const quantidadeAtual = prevColmeias[tipo]?.[estado] || 0;
  
      const updatedColmeias = {
        ...prevColmeias,
        [tipo]: {
          ...prevColmeias[tipo],
          [estado]: quantidadeAtual + quantidadeNova, // Somando as quantidades
        },
      };
  
      // Salvar os dados atualizados no localStorage
      localStorage.setItem("colmeias", JSON.stringify(updatedColmeias));
  
      return updatedColmeias;
    });
  };
  
const totalEmCampo = Object.values(colmeias).reduce((acc, tipo) => acc + (tipo.em_campo || 0), 0);
const totalVazias = Object.values(colmeias).reduce((acc, tipo) => acc + (tipo.vazia || 0), 0);

  
  return (
    <AppBody>
      <Header />

      <Main>
        <ContainerPrincipal>
          <ContainerText>
            <TextImg>
              <Text>Em campo</Text>
              <Icone src={Campo} alt={"campo"} />
            </TextImg>
            <Total>Colméias: {totalEmCampo}</Total>
          </ContainerText>
          <ContainerDiv1>
            <Container>
              <BotaoContainer>
                <ContainerRow>
                  {["NINHO", "MELGUEIRA"].map((tipo) => (
                    <ContainerInform key={tipo}>
                      <Informacoes onClick={() => handleEditClick(tipo, "em_campo")}>
                        <SectionColmeias>{tipo}</SectionColmeias>
                        {editando?.tipo === tipo && editando?.estado === "em_campo" ? (
                          <input
                            type="text"
                            value={novoValor}
                            onChange={handleChange}
                            onBlur={handleBlurOrEnter}
                            onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter()}
                            autoFocus
                          />
                        ) : (
                          <InfoItem>{colmeias[tipo].em_campo || 0}</InfoItem>
                        )}
                      </Informacoes>
                    </ContainerInform>
                  ))}
                </ContainerRow>
                <ContainerInform>
                  <Informacoes onClick={() => handleEditClick("NUCLEO", "em_campo")}>
                    <SectionColmeias>NÚCLEOS</SectionColmeias>
                    {editando?.tipo === "NUCLEO" && editando?.estado === "em_campo" ? (
                      <input
                        type="text"
                        value={novoValor}
                        onChange={handleChange}
                        onBlur={handleBlurOrEnter}
                        onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter()}
                        autoFocus
                      />
                    ) : (
                      <InfoItem>{colmeias.NUCLEO.em_campo || 0}</InfoItem>
                    )}
                  </Informacoes>
                </ContainerInform>
              </BotaoContainer>
            </Container>
            <ContainerDivider />
          </ContainerDiv1>

          <ContainerDiv2>
  <ContainerText>
    <TextImg>
      <Text>Galpão</Text>
      <Icone src={Deposito} alt={"deposito"} />
    </TextImg>
    <Total>Colméias: {totalVazias}</Total>
  </ContainerText>
  
  <BotaoContainer>
    {/* Primeira linha com NINHO e MELGUEIRA */}
    <ContainerRow>
      {["NINHO", "MELGUEIRA"].map((tipo) => (
        <ContainerInform key={tipo}>
          <Informacoes onClick={() => handleEditClick(tipo, "vazia")}>
            <SectionColmeias>{tipo}</SectionColmeias>
            {editando?.tipo === tipo && editando?.estado === "vazia" ? (
              <input
                type="text"
                value={novoValor}
                onChange={handleChange}
                onBlur={handleBlurOrEnter}
                onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter()}
                autoFocus
              />
            ) : (
              <InfoItem>{colmeias[tipo].vazia || 0}</InfoItem>
            )}
          </Informacoes>
        </ContainerInform>
      ))}
    </ContainerRow>

    {/* NUCLEO fora do ContainerRow, abaixo das outras colmeias */}
    <ContainerInform>
      <Informacoes onClick={() => handleEditClick("NUCLEO", "vazia")}>
        <SectionColmeias>NÚCLEOs</SectionColmeias>
        {editando?.tipo === "NUCLEO" && editando?.estado === "vazia" ? (
          <input
            type="text"
            value={novoValor}
            onChange={handleChange}
            onBlur={handleBlurOrEnter}
            onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter()}
            autoFocus
          />
        ) : (
          <InfoItem>{colmeias.NUCLEO.vazia || 0}</InfoItem>
        )}
      </Informacoes>
    </ContainerInform>
  </BotaoContainer>
</ContainerDiv2>


          <ContainerAdicionar>
            <StyledIcon onClick={toggleModal} />
          </ContainerAdicionar>

          <Modal   isOpen={showModal} 
  closeModalColmeia={toggleModal} 
  onAddColmeia={onAddColmeia}  />
        </ContainerPrincipal>
      </Main>
    </AppBody>
  );
};

export default Colmeias;
