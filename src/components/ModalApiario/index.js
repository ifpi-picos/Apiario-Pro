import React, { useState } from 'react';
import axios from 'axios';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import {
  Dialog,
  ContainerAdicionarApiario,
  ContainerH2Apiario,
  StyledIcon,
  H2AdicionarApiario,
  InputSelect,
  ContainerButtonExit,
  FormDetalhesApiario,
  ContainerCategoria,
  H4InfomacoesInputs,
  ContainerDescricaoApiario,
  DivButtonNovaApiario,
  ButtonCriarApiario,
  ModalBackground,
  ContainerButton,
} from './styles';

const ModalApiario = ({ isOpen, closeModalApiario, onAddApiario, token }) => {
  const [formState, setFormState] = useState({
    regiao: '',
    florada: '',
    colmeias: '',
    imagem: '',
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { regiao, florada, colmeias, imagem } = formState;

    if (!regiao || !florada || !colmeias) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      alert('Erro: Usuário não autenticado.');
      return;
    }

    try {
      const response = await axios.post(
        'https://projeto-full-stack-apiariopro.onrender.com/apiarios/cadastrar',
        {
          regiao,
          florada,
          colmeias,
          imagem,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Após o cadastro do apiário, chama o onAddApiario para atualizar a lista local
      onAddApiario(response.data);
      setFormState({ regiao: '', florada: '', colmeias: '', imagem: '' });
      closeModalApiario(); // Fecha a modal após a criação
    } catch (error) {
      alert('Erro ao cadastrar apiário.');
      console.error(error);
    }
  };

  const handleClose = () => {
    setFormState({ regiao: '', florada: '', colmeias: '', imagem: '' });
    closeModalApiario();
  };

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <Dialog open={isOpen}>
        <ContainerAdicionarApiario>
          <ContainerH2Apiario>
            <H2AdicionarApiario>ADICIONAR APIÁRIO</H2AdicionarApiario>
            <ContainerButtonExit>
              <StyledIcon icon={faClose} onClick={handleClose} />
            </ContainerButtonExit>
          </ContainerH2Apiario>
          <FormDetalhesApiario onSubmit={handleSubmit}>
            <ContainerDescricaoApiario>
              <H4InfomacoesInputs>REGIÃO</H4InfomacoesInputs>
              <InputSelect
                type="text"
                name="regiao"
                value={formState.regiao}
                onChange={handleChange}
              />
            </ContainerDescricaoApiario>

            <ContainerDescricaoApiario>
              <H4InfomacoesInputs>FLORADA</H4InfomacoesInputs>
              <InputSelect
                type="text"
                name="florada"
                value={formState.florada}
                onChange={handleChange}
              />
            </ContainerDescricaoApiario>

            <ContainerDescricaoApiario>
              <H4InfomacoesInputs>COLMEIAS</H4InfomacoesInputs>
              <InputSelect
                type="number"
                name="colmeias"
                value={formState.colmeias}
                onChange={handleChange}
              />
            </ContainerDescricaoApiario>

            <ContainerDescricaoApiario>
              <H4InfomacoesInputs>IMAGEM</H4InfomacoesInputs>
              <InputSelect
                type="text"
                name="imagem"
                value={formState.imagem}
                onChange={handleChange}
              />
            </ContainerDescricaoApiario>

            <ContainerButton>
              <DivButtonNovaApiario>
                <ButtonCriarApiario type="submit">ADICIONAR</ButtonCriarApiario>
              </DivButtonNovaApiario>
              <DivButtonNovaApiario>
                <ButtonCriarApiario type="button" onClick={handleClose}>
                  CANCELAR
                </ButtonCriarApiario>
              </DivButtonNovaApiario>
            </ContainerButton>
          </FormDetalhesApiario>
        </ContainerAdicionarApiario>
      </Dialog>
    </ModalBackground>
  );
};

export default ModalApiario;
