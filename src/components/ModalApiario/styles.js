import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Dialog = styled.dialog`
  position: relative;
  border: none;
  background-color: transparent;
  border-radius: 25px;
  max-width: 58em;
  padding: 0;
  margin: 1em;

  @media (max-height: 700px) {
    overflow-y: auto; 
  max-height: 80vh;
  }
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:rgba(48, 37, 1, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ContainerAdicionarTarefa = styled.div`
`;

export const ContainerH2Tarefa = styled.div`
background-color: #ffc400;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const H2AdicionarTarefa = styled.h2`
  margin: 0 0.5em;
  font-size: 20px;
  
`;

export const ContainerButtonExit = styled.div`
  display: flex;
  justify-content: end;
  height: 36px;
`;
export const StyledIcon = styled(FontAwesomeIcon)`
  margin: 0.1em 0.2em 0.8em 0;
  font-size: 30px;
  cursor: pointer;
`;
export const FormDetalhesTarefas = styled.form`
  
  background-color: #fff;
  padding-bottom: 2em;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding-right: 10px;
`;

export const ContainerCategoria = styled.div`
  padding: 1em 0 0.7em 1em;
  display: flex;
  align-items: center;
  
`;

export const H4InfomacoesInputs = styled.h4`
  margin: 0;
  font-weight: 600;
  font-size: 20px;
  margin-right: 10px;
  min-width: 5em;
`;

export const SelectInputsWidth = styled.select`
  width: 10.5em;
  background-color: #D9D9D9;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    height: 1.8em;
    margin-right: 3px;
`;
export const InputSelect = styled.input`
  background-color: #d9d9d9;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;

  height: 1.8em;
  margin-right: 3px;
  width: 90%;
  max-width: 13.5em;
  &::placeholder {
    font-weight: bold;
     font-size: 14px;
    @media (max-width: 555px) {

    }
`;
export const TextArea = styled.textarea`
    background-color: #D9D9D9;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    font-size: 16px;
    height: 1.8em;
    margin-right: 3px;
    text-align: start;
    padding: 4px 0 0 10px;
    width: 90%;
    max-height: 80px;
    
`;

export const ContainerImportancia = styled.div`
  padding: 1em 0 0.7em 1em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const ContainerInicio = styled.div`
  padding: 1em 0 0.7em 1em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const ContainerInicioConclusaoHorario = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5px;
`;

export const ContainerConclusao = styled.div`
  padding: 1em 0 0.7em 1em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const ContainerDescricaoTarefa = styled.div`
  padding: 1em 0 0.7em 1em;
  display: flex;
  align-items: center;

`;

export const DivButtonNovaTarefa = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 2em;
    width:100%
`;

export const ButtonCriarTarefa = styled.button`
  height: 2.5em;
  width: 100%;
  border: none;
  border-radius: 25px;
  background-color:#ffc400;
  ;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: 1.5s ease;
  
    margin-left: 20px;
  padding: 10px;
  &:hover {
    background-color:rgba(182, 146, 26, 0.8);
  }
`;
export const ContainerButton = styled.div`
display:flex;
align-items: center;


`;
export const FileInputLabel = styled.label`
  display: inline-block;
  padding: 10px 15px;
      background-color: #3c3b3b;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {

  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;