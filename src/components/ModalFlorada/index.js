import React, { useState } from "react";
import axios from "axios";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  ContainerAdicionarTarefa,
  ContainerH2Tarefa,
  StyledIcon,
  H2AdicionarTarefa,
  InputSelect,
  ContainerButtonExit,
  FormDetalhesTarefas,
  ContainerCategoria,
  H4InfomacoesInputs,
  SelectInputsWidth,
  ContainerDescricaoTarefa,
  DivButtonNovaTarefa,
  ButtonCriarTarefa,
  ModalBackground,
  ContainerButton,
  ButtonCancelar,
} from "./styled";

const ModalFlorada = ({ isOpen, closeModalFlorada, onAddFlorada, token }) => {
  const [formState, setFormState] = useState({
    nome: "",
    data_inicio: "",
    data_fim: "",
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { nome, data_inicio, data_fim } = formState;
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const usuarioId = usuario?.id;
  
    if (!token || !usuarioId) {
      alert("Erro: Usuário não autenticado.");
      return;
    }
  
    if (nome && data_inicio && data_fim) {
      try {
        const response = await axios.post(
          "https://projeto-full-stack-apiariopro.onrender.com/floradas/cadastrar",
          {
            nome,
            data_inicio,
            data_fim,
            usuarioId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Após adicionar a florada no back-end, chama o onAddFlorada para atualizar a lista local
        onAddFlorada(response.data); 
        setFormState({ nome: "", data_inicio: "", data_fim: "" });
        closeModalFlorada(); // Fechar a modal
      } catch (error) {
        alert("Erro ao cadastrar a florada.");
        console.error(error);
      }
    } else {
      alert("Preencha todos os campos corretamente.");
    }
  };

  const handleClose = () => {
    setFormState({ nome: "", data_inicio: "", data_fim: "" });
    closeModalFlorada();
  };

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <Dialog open={isOpen}>
        <ContainerAdicionarTarefa>
          <ContainerH2Tarefa>
            <H2AdicionarTarefa>ADICIONAR FLORADA</H2AdicionarTarefa>
            <ContainerButtonExit>
              <StyledIcon icon={faClose} onClick={handleClose} />
            </ContainerButtonExit>
          </ContainerH2Tarefa>
          <FormDetalhesTarefas onSubmit={handleSubmit}>
            <ContainerDescricaoTarefa>
              <H4InfomacoesInputs>NOME</H4InfomacoesInputs>
              <InputSelect
                type="text"
                name="nome"
                value={formState.nome}
                onChange={handleChange}
                maxLength={20}
              />
            </ContainerDescricaoTarefa>

            <ContainerDescricaoTarefa>
              <H4InfomacoesInputs>DATA DE INÍCIO</H4InfomacoesInputs>
              <select
                name="data_inicio"
                value={formState.data_inicio}
                onChange={handleChange}
                style={{
                  width: "50%",
                  padding: "8px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Selecione o mês</option>
                <option value="Janeiro">Janeiro</option>
                <option value="Fevereiro">Fevereiro</option>
                <option value="Março">Março</option>
                <option value="Abril">Abril</option>
                <option value="Maio">Maio</option>
                <option value="Junho">Junho</option>
                <option value="Julho">Julho</option>
                <option value="Agosto">Agosto</option>
                <option value="Setembro">Setembro</option>
                <option value="Outubro">Outubro</option>
                <option value="Novembro">Novembro</option>
                <option value="Dezembro">Dezembro</option>
              </select>
            </ContainerDescricaoTarefa>

            <ContainerDescricaoTarefa>
              <H4InfomacoesInputs>DATA DE FIM</H4InfomacoesInputs>
              <select
                name="data_fim"
                value={formState.data_fim}
                onChange={handleChange}
                style={{
                  width: "50%",
                  padding: "8px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  margin: "auto",
                }}
              >
                <option value="">Selecione o mês</option>
                <option value="Janeiro">Janeiro</option>
                <option value="Fevereiro">Fevereiro</option>
                <option value="Março">Março</option>
                <option value="Abril">Abril</option>
                <option value="Maio">Maio</option>
                <option value="Junho">Junho</option>
                <option value="Julho">Julho</option>
                <option value="Agosto">Agosto</option>
                <option value="Setembro">Setembro</option>
                <option value="Outubro">Outubro</option>
                <option value="Novembro">Novembro</option>
                <option value="Dezembro">Dezembro</option>
              </select>
            </ContainerDescricaoTarefa>

            <ContainerButton>
              <DivButtonNovaTarefa>
                <ButtonCriarTarefa type="submit">ADICIONAR</ButtonCriarTarefa>
              </DivButtonNovaTarefa>
              <DivButtonNovaTarefa>
                <ButtonCancelar type="button" onClick={closeModalFlorada}>CANCELAR</ButtonCancelar>
              </DivButtonNovaTarefa>
            </ContainerButton>
          </FormDetalhesTarefas>
        </ContainerAdicionarTarefa>
      </Dialog>
    </ModalBackground>
  );
};

export default ModalFlorada;
