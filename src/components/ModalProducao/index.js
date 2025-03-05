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
  H4InfomacoesInputs2,
} from "./styles";

const ModalProducao = ({ isOpen, closeModalProducao, onAddProducao }) => {
    const initialFormState = {
      quantidade_florada: "",
      florada: "",
      quantidade_mes: "",
      mes: "",
    };
  
    const [formState, setFormState] = useState(initialFormState);
  
    const handleChange = (event) => {
      setFormState({
        ...formState,
        [event.target.name]: event.target.value,
      });
    };
  
    const resetForm = () => {
      setFormState(initialFormState);
    };
  
    const handleCloseModal = () => {
      resetForm();
      closeModalProducao();
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (formState.quantidade_florada && formState.florada && formState.quantidade_mes && formState.mes) {
        onAddProducao(formState);
        resetForm();
        closeModalProducao();
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
              <H2AdicionarTarefa>ADICIONAR PRODUÇÃO</H2AdicionarTarefa>
              <ContainerButtonExit>
                <StyledIcon icon={faClose} onClick={handleCloseModal} />
              </ContainerButtonExit>
            </ContainerH2Tarefa>
            <FormDetalhesTarefas onSubmit={handleSubmit}>
              <ContainerCategoria>
                <H4InfomacoesInputs>QUANTIDADE</H4InfomacoesInputs>
                <InputSelect
                  type="number"
                  name="quantidade_florada"
                  value={formState.quantidade_florada}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 6) {
                      handleChange(e);
                    }
                  }}
                  min="0"
                  max="999999" 
                />
                <H4InfomacoesInputs>KG</H4InfomacoesInputs>
              </ContainerCategoria>
              <ContainerDescricaoTarefa>
                <H4InfomacoesInputs2>FLORADA</H4InfomacoesInputs2>
                <SelectInputsWidth
                  name="florada"
                  value={formState.florada}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="ANGICO">Angico</option>
                  <option value="MARMELEIRO">Marmeleiro</option>
                  <option value="BAMBURRAL">Bamburral</option>
                  <option value="JITIRANA">Jitirana</option>
                  <option value="MARMELEIRO_ANGICO">Marmeleiro, Angico</option>
                  <option value="ANGICO_JITIRANA">Angico, Jitirana</option>
                </SelectInputsWidth>
              </ContainerDescricaoTarefa>
              <ContainerDescricaoTarefa>
                <H4InfomacoesInputs>QUANTIDADE</H4InfomacoesInputs>
                <InputSelect
                  type="number"
                  name="quantidade_mes"
                  value={formState.quantidade_mes}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 6) {
                      handleChange(e);
                    }
                  }}
                  min="0"
                  max="999999" 
                />
                  <H4InfomacoesInputs>KG</H4InfomacoesInputs>
              </ContainerDescricaoTarefa>
              <ContainerDescricaoTarefa>
                <H4InfomacoesInputs2>MÊS</H4InfomacoesInputs2>
                <SelectInputsWidth
                  name="mes"
                  value={formState.mes}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
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
                </SelectInputsWidth>
              </ContainerDescricaoTarefa>
              <ContainerButton>
                <DivButtonNovaTarefa>
                  <ButtonCriarTarefa type="submit">ADICIONAR</ButtonCriarTarefa>
                </DivButtonNovaTarefa>
                <DivButtonNovaTarefa>
                  <ButtonCriarTarefa type="button" onClick={handleCloseModal}>CANCELAR</ButtonCriarTarefa>
                </DivButtonNovaTarefa>
              </ContainerButton>
            </FormDetalhesTarefas>
          </ContainerAdicionarTarefa>
        </Dialog>
      </ModalBackground>
    );
  };
  
  export default ModalProducao;
  
