import React, { useState, useEffect } from "react";
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
} from "./styled";

const ModalFlorada = ({ isOpen, closeModalFlorada, onAddFlorada }) => {
  const [formState, setFormState] = useState({
    nome: "",
    data_inicio: "",
    data_fim: "",
  });
const [floradas, setFloradas] = useState([]);
useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("floradas")) || [];
    setFloradas(dadosSalvos);
  }, []);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };
  const salvarFlorada= (novaFlorada) => {
    const novasFloradas = [...floradas, novaFlorada];
    setFloradas(novasFloradas);
    localStorage.setItem("floradas", JSON.stringify(novasFloradas));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { nome,  data_inicio, data_fim } = formState;

    if (nome && data_inicio && data_fim) {
      salvarFlorada(formState);
      setFormState({ nome: "", data_inicio: "", data_fim: ""});
      closeModalFlorada(); // Fechar a modal

      // Forçar o recarregamento da página
      window.location.reload();
    } else {
      alert("Preencha todos os campos corretamente.");
    }
  };
  const handleClose = () => {
    setFormState({nome: "", data_inicio: "", data_fim: ""});
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
              <StyledIcon icon={faClose}onClick={handleClose}  />
            </ContainerButtonExit>
          </ContainerH2Tarefa>
          <FormDetalhesTarefas onSubmit={handleSubmit}>
            
          <ContainerDescricaoTarefa>
  <H4InfomacoesInputs>NOME</H4InfomacoesInputs>
  <InputSelect
    type="text"
    name="nome"
    value={formState.nome}  // Corrigido: de 'quantidade' para 'nome'
    onChange={handleChange}
  />
</ContainerDescricaoTarefa>

<ContainerDescricaoTarefa>
  <H4InfomacoesInputs>DATA DE INÍCIO</H4InfomacoesInputs>
  <select
    name="data_inicio"
    value={formState.dataInicio}
    onChange={handleChange}
    style={{ width: "50%", padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
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
    value={formState.dataFim}
    onChange={handleChange}
    style={{ width: "50%", padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc", margin:"auto" }}
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
                <ButtonCriarTarefa type="button" onClick={closeModalFlorada}>CANCELAR</ButtonCriarTarefa>
              </DivButtonNovaTarefa>
            </ContainerButton>
          </FormDetalhesTarefas>
        </ContainerAdicionarTarefa>
      </Dialog>
    </ModalBackground>
  );
};

export default ModalFlorada;
