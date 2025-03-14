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

const ModalColmeia = ({ isOpen, closeModalColmeia, onAddColmeia }) => {
  const [formState, setFormState] = useState({
    tipo_colmeia: "",
    quantidade: "",
    estado: "",
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!formState.tipo_colmeia || !formState.quantidade || !formState.estado) {
      alert("Preencha todos os campos corretamente.");
      return;
    }
  
    const usuarioId = localStorage.getItem("usuarioId"); // Obtém o ID do usuário logado
  
    if (!usuarioId) {
      alert("Erro: Usuário não autenticado.");
      return;
    }
  
    try {
      const response = await axios.post("https://projeto-full-stack-apiariopro.onrender.com/colmeias/cadastrar", {
        tipo: formState.tipo_colmeia,
        quantidade: parseInt(formState.quantidade, 10),
        estado: formState.estado,
        usuarioId: usuarioId, // Usa o ID salvo no localStorage
      });
  
      if (response.status === 201) {
        alert("Colmeia cadastrada com sucesso!");
        onAddColmeia(response.data);
        closeModalColmeia();
      }
    } catch (error) {
      console.error("Erro ao cadastrar colmeia:", error);
      alert("Erro ao cadastrar colmeia. Tente novamente.");
    }
  };
  

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <Dialog open={isOpen}>
        <ContainerAdicionarTarefa>
          <ContainerH2Tarefa>
            <H2AdicionarTarefa>ADICIONAR COLMEIA</H2AdicionarTarefa>
            <ContainerButtonExit>
              <StyledIcon icon={faClose} onClick={closeModalColmeia} />
            </ContainerButtonExit>
          </ContainerH2Tarefa>
          <FormDetalhesTarefas onSubmit={handleSubmit}>
            <ContainerCategoria>
              <H4InfomacoesInputs>TIPO</H4InfomacoesInputs>
              <SelectInputsWidth
                name="tipo_colmeia"
                value={formState.tipo_colmeia}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="MELGUEIRA">Melgueira</option>
                <option value="NINHO">Ninho</option>
                <option value="NUCLEO">Núcleo</option>
              </SelectInputsWidth>
            </ContainerCategoria>
            <ContainerDescricaoTarefa>
              <H4InfomacoesInputs>QUANTIDADE</H4InfomacoesInputs>
              <InputSelect
                type="number"
                name="quantidade"
                value={formState.quantidade}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 6) {
                    handleChange(e);
                  }
                }}
                min="0"
                max="999999" 
                
              />
            </ContainerDescricaoTarefa>
            <ContainerDescricaoTarefa>
              <H4InfomacoesInputs>ESTADO</H4InfomacoesInputs>
              <SelectInputsWidth
                name="estado"
                value={formState.estado}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="EM_CAMPO">Em Campo</option>
                <option value="VAZIA">Galpão</option>
              </SelectInputsWidth>
            </ContainerDescricaoTarefa>
            <ContainerButton>
              <DivButtonNovaTarefa>
                <ButtonCriarTarefa type="submit">ADICIONAR</ButtonCriarTarefa>
              </DivButtonNovaTarefa>
              <DivButtonNovaTarefa>
                <ButtonCriarTarefa type="button" onClick={closeModalColmeia}>CANCELAR</ButtonCriarTarefa>
              </DivButtonNovaTarefa>
            </ContainerButton>
          </FormDetalhesTarefas>
        </ContainerAdicionarTarefa>
      </Dialog>
    </ModalBackground>
  );
};

export default ModalColmeia;
