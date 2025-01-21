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
} from "./styles";

const ModalApiario = ({ isOpen, closeModalApiario, onAddApiario }) => {
  const [formState, setFormState] = useState({
    regiao: "",
    florada: "",
    colmeias: "",
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formState.regiao&& formState.florada&& formState.colmeias) {
      onAddApiario(formState);
      closeModalApiario();
    } else {
      alert("Preencha todos os campos corretamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <Dialog open={isOpen}>
        <ContainerAdicionarTarefa>
          <ContainerH2Tarefa>
            <H2AdicionarTarefa>ADICIONAR APIÁRIO</H2AdicionarTarefa>
            <ContainerButtonExit>
              <StyledIcon icon={faClose} onClick={closeModalApiario} />
            </ContainerButtonExit>
          </ContainerH2Tarefa>
          <FormDetalhesTarefas onSubmit={handleSubmit}>
            
          <ContainerDescricaoTarefa>
  <H4InfomacoesInputs>REGIAO</H4InfomacoesInputs>
  <InputSelect
    type="text"
    name="nome"
    value={formState.nome}  // Corrigido: de 'quantidade' para 'nome'
    onChange={handleChange}
  />
</ContainerDescricaoTarefa>

<ContainerDescricaoTarefa>
  <H4InfomacoesInputs>FLORADA</H4InfomacoesInputs>
  <InputSelect
    type="text"
    name="nome"
    value={formState.nome}  // Corrigido: de 'quantidade' para 'nome'
    onChange={handleChange}
  />
</ContainerDescricaoTarefa>

<ContainerDescricaoTarefa>
              <H4InfomacoesInputs>COLMEIAS</H4InfomacoesInputs>
              <InputSelect
                type="number"
                name="quantidade"
                value={formState.quantidade}
                onChange={handleChange}
                min="1"
              />
            </ContainerDescricaoTarefa>
            <ContainerButton>
              <DivButtonNovaTarefa>
                <ButtonCriarTarefa type="submit">ADICIONAR</ButtonCriarTarefa>
              </DivButtonNovaTarefa>
              <DivButtonNovaTarefa>
                <ButtonCriarTarefa type="button" onClick={closeModalApiario}>CANCELAR</ButtonCriarTarefa>
              </DivButtonNovaTarefa>
            </ContainerButton>
          </FormDetalhesTarefas>
        </ContainerAdicionarTarefa>
      </Dialog>
    </ModalBackground>
  );
};

export default ModalApiario;
