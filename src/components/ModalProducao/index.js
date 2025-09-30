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
  ButtonCancelar,
} from "./styles";

const ModalProducao = ({ isOpen, closeModalProducao,  onProducaoAdicionada }) => {
    const initialFormState = {
      quantidade_florada: "",
      florada: "",
      quantidade_mes: "",
      mes: "",
    };
  
    const [formState, setFormState] = useState(initialFormState);
  
    const handleChange = (event) => {
      let { name, value } = event.target;

  // Substituir vírgula por ponto para garantir compatibilidade
  if (name === "quantidade_florada" || name === "quantidade_mes") {
    value = value.replace(",", ".");
  }

  setFormState({
    ...formState,
    [name]: value,
  });
};
  
    const resetForm = () => {
      setFormState(initialFormState);
    };
  
    const handleCloseModal = () => {
      resetForm();
      closeModalProducao();
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      if (formState.quantidade_florada && formState.florada && formState.quantidade_mes && formState.mes) {
        try {
          const token = localStorage.getItem("token"); // Pegue o token armazenado
    
          await axios.post(
            "https://projeto-full-stack-apiariopro.onrender.com/gestao/cadastrar",
            { ...formState, ano: new Date().getFullYear() }, // Adiciona o ano atual
            { headers: { Authorization: `Bearer ${token}` } }
          );
    
          alert("Produção cadastrada com sucesso!");
          resetForm();
          onProducaoAdicionada(); 
          closeModalProducao();
        } catch (error) {
          console.error("Erro ao cadastrar produção:", error.response?.data?.mensagem || error.message);
          alert(error.response?.data?.mensagem || "Erro ao cadastrar produção.");
        }
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
                  step="any"
                  min="0"
                  max="999999" 
                />
                <H4InfomacoesInputs>KG</H4InfomacoesInputs>
              </ContainerCategoria>
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
                  step="any"
                  min="0"
                  max="999999" 
                />
                  <H4InfomacoesInputs>KG</H4InfomacoesInputs>
              </ContainerDescricaoTarefa>
            
              <ContainerButton>
                <DivButtonNovaTarefa>
                  <ButtonCriarTarefa type="submit">ADICIONAR</ButtonCriarTarefa>
                </DivButtonNovaTarefa>
                <DivButtonNovaTarefa>
                  <ButtonCancelar type="button" onClick={handleCloseModal}>CANCELAR</ButtonCancelar>
                </DivButtonNovaTarefa>
              </ContainerButton>
            </FormDetalhesTarefas>
          </ContainerAdicionarTarefa>
        </Dialog>
      </ModalBackground>
    );
  };
  
  export default ModalProducao;
  
