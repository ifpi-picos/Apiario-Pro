import React, { useState, useEffect } from "react";
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
  ContainerDescricaoTarefa,
  H4InfomacoesInputs,
  ContainerButton,
  DivButtonNovaTarefa,
  ButtonCriarTarefa,
  ModalBackground,
} from "./styles";

const ModalApiario = ({ isOpen, closeModalApiario, onAddApiario }) => {
  const [formState, setFormState] = useState({
    regiao: "",
    florada: "",
    colmeias: "",
    imagem: null,
  });

  const [apiarios, setApiarios] = useState([]);

  // Carregar dados salvos no localStorage ao abrir o site
  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("apiarios")) || [];
    setApiarios(dadosSalvos);
  }, []);

  // Atualizar os campos do formulário
  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  // Converter a imagem para Base64 antes de salvar
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState({ ...formState, imagem: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Salvar apiário no localStorage
  const salvarApiario = (novoApiario) => {
    const novosApiarios = [...apiarios, novoApiario];
    setApiarios(novosApiarios);
    localStorage.setItem("apiarios", JSON.stringify(novosApiarios));
  };

  // Manipular o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    const { regiao, florada, colmeias, imagem } = formState;

    if (regiao && florada && colmeias && imagem) {
      salvarApiario(formState);
      setFormState({ regiao: "", florada: "", colmeias: "", imagem: null });
      closeModalApiario(); // Fechar a modal

      // Forçar o recarregamento da página
      window.location.reload();
    } else {
      alert("Preencha todos os campos corretamente.");
    }
  };

  // Fechar a modal e limpar os campos
  const handleClose = () => {
    setFormState({ regiao: "", florada: "", colmeias: "", imagem: null });
    closeModalApiario();
  };

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <Dialog open={isOpen}>
        <ContainerAdicionarTarefa>
          <ContainerH2Tarefa>
            <H2AdicionarTarefa>ADICIONAR APIÁRIO</H2AdicionarTarefa>
            <ContainerButtonExit>
              <StyledIcon icon={faClose} onClick={handleClose} />
            </ContainerButtonExit>
          </ContainerH2Tarefa>
          <FormDetalhesTarefas onSubmit={handleSubmit}>
            <ContainerDescricaoTarefa>
              <H4InfomacoesInputs>REGIÃO</H4InfomacoesInputs>
              <InputSelect
                type="text"
                name="regiao"
                value={formState.regiao}
                onChange={handleChange}
              />
            </ContainerDescricaoTarefa>

            <ContainerDescricaoTarefa>
              <H4InfomacoesInputs>FLORADA</H4InfomacoesInputs>
              <select
                name="florada"
                value={formState.florada}
                onChange={handleChange}
                style={{
                  width: "60%",
                  padding: "8px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Selecione a florada</option>
                <option value="Angico">Angico</option>
                <option value="Mamaleiro">Mamaleiro</option>
                <option value="Florada Silvestre">Florada Silvestre</option>
              </select>
            </ContainerDescricaoTarefa>

            <ContainerDescricaoTarefa>
              <H4InfomacoesInputs>COLMEIAS</H4InfomacoesInputs>
              <InputSelect
                type="number"
                name="colmeias"
                value={formState.colmeias}
                onChange={handleChange}
                min="1"
              />
            </ContainerDescricaoTarefa>

            <ContainerDescricaoTarefa>
              <H4InfomacoesInputs>Imagem</H4InfomacoesInputs>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </ContainerDescricaoTarefa>

            <ContainerButton>
              <DivButtonNovaTarefa>
                <ButtonCriarTarefa type="submit">ADICIONAR</ButtonCriarTarefa>
              </DivButtonNovaTarefa>
              <DivButtonNovaTarefa>
                <ButtonCriarTarefa type="button" onClick={handleClose}>
                  CANCELAR
                </ButtonCriarTarefa>
              </DivButtonNovaTarefa>
            </ContainerButton>
          </FormDetalhesTarefas>
        </ContainerAdicionarTarefa>
      </Dialog>
    </ModalBackground>
  );
};

export default ModalApiario;
