import React, { useState, useEffect } from 'react';
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
    nomeFlorada: '', // Novo campo para armazenar o nome da florada
    colmeias: '',
    imagem: '',
  });
  const [floradas, setFloradas] = useState([]);

  useEffect(() => {
    const fetchFloradas = async () => {
      try {
        const storedToken = token || localStorage.getItem('token');
        if (!storedToken) return;
        
        const response = await axios.get('https://projeto-full-stack-apiariopro.onrender.com/floradas', {
          headers: { Authorization: `Bearer ${storedToken}` }
        });

        setFloradas(response.data);
      } catch (error) {
        console.error('Erro ao buscar floradas:', error);
      }
    };

    fetchFloradas();
  }, [token]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { regiao, florada, nomeFlorada, colmeias, imagem } = formState;
    
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
          florada, // ID da florada
          nomeFlorada, // Nome da florada
          colmeias,
          imagem,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      onAddApiario(response.data);
      setFormState({ regiao: '', florada: '', nomeFlorada: '', colmeias: '', imagem: '' });
      closeModalApiario();
    } catch (error) {
      alert('Erro ao cadastrar apiário.');
      console.error(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "florada") {
      // Busca a florada correspondente pelo ID
      const floradaSelecionada = floradas.find(florada => florada.id === parseInt(value));
  
      setFormState({
        ...formState,
        florada: value, // Continua armazenando o ID da florada
        nomeFlorada: floradaSelecionada ? floradaSelecionada.nome : "", // Armazena o nome da florada
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
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
              <InputSelect type="text" name="regiao" value={formState.regiao} onChange={handleChange} />
            </ContainerDescricaoApiario>

            <ContainerDescricaoApiario>
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
                <option value="">Selecione uma florada</option>
                {floradas.map((florada) => (
                  <option key={florada.id} value={florada.id}>
                    {florada.nome}
                  </option>
                ))}
              </select>
            </ContainerDescricaoApiario>

            <ContainerDescricaoApiario>
              <H4InfomacoesInputs>COLMEIAS</H4InfomacoesInputs>
              <InputSelect type="number" name="colmeias" value={formState.colmeias} onChange={handleChange} />
            </ContainerDescricaoApiario>

            <ContainerDescricaoApiario>
              <H4InfomacoesInputs>IMAGEM</H4InfomacoesInputs>
              <InputSelect type="text" name="imagem" value={formState.imagem} onChange={handleChange} />
            </ContainerDescricaoApiario>

            <ContainerButton>
              <DivButtonNovaApiario>
                <ButtonCriarApiario type="submit">ADICIONAR</ButtonCriarApiario>
              </DivButtonNovaApiario>
              <DivButtonNovaApiario>
                <ButtonCriarApiario type="button" onClick={handleClose}>CANCELAR</ButtonCriarApiario>
              </DivButtonNovaApiario>
            </ContainerButton>
          </FormDetalhesApiario>
        </ContainerAdicionarApiario>
      </Dialog>
    </ModalBackground>
  );
};

export default ModalApiario;
