import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Adicionar from "../../assets/adicionar.png";

export const AppBody = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  height: 100vh;
`;

export const Main = styled.div`

`;

export const Container = styled.div`

`;

export const ContainerPrincipal = styled.div`
  display: flex;
  flex-direction: column;
  height: 78vh; 
  align-items:center;
`;

export const Text = styled.p`
  display: flex;
  font-weight: bold;
  justify-content: center;
`;
export const ContainerText = styled.div`
  display: flex;
  height:30px;
  width:80%;
  margin-right:0;
  
 
`;


export const H1 = styled.h1`
  margin: 1em 0.2em 1px;   
`;

export const H2 = styled.h2`
  font-size: 26px;
  font-weight: 600;

  @media (max-width: 330px)
  {
    font-size: 18px;
  }
`;
  
export const BotaoContainer = styled.div`

  display: flex;
   
  /* Espaçamento entre os botões */
  padding: 20px; /* Espaçamento interno opcional */
  max-width: 1250px; /* Define uma largura máxima, se necessário */
  flex-direction: column;
  align-items: center;
    @media (max-width: 568px) {
   padding: 10px;
  }
`;

export const Botao = styled.div`

`;

export const SectionColmeias = styled.p`
  display: flex;
  font-weight: bold;
  margin-bottom: 5px; /* Espaço entre a imagem e os itens */
  margin-top:0;
`;

export const Informacoes = styled.div`
  display: flex;
  flex-direction: column; /* Organiza as informações em coluna */
  align-items: center; /* Centraliza o texto */


`;

export const InfoItem = styled.span`
  font-size: 25px;
  
  font-weight: 500;
`;

export const AcoesContainer = styled.div`
  margin-left: auto;
  bottom: 10px; /* Distância do fundo */
  right: 10px; /* Distância da direita */
  display: flex;
  gap: 10px; /* Espaço entre os botões */
`;

export const AcaoBotao = styled.button`
  background-color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ;
  }

  svg {
    font-size: 16px; /* Tamanho dos ícones */
    color: red;
  }
`;

export const ContainerAdicionar = styled.div`
  position: fixed; /* Fixa o elemento na tela */
  bottom: 35px; /* Distância do canto inferior */
  right: 35px; /* Distância do canto direito */
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 842px) {
    bottom: 10px; /* Ajuste para telas menores */
    right: 10px;
  }
`;

export const ButtonAdicionar = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background-size: cover;
  background-color: #ffffff00;
  cursor: pointer;
  
background-image: url(${Adicionar});
  width: 35px;
  height: 35px;
  &:hover {
    opacity: 50%;
  }
  @media (max-width: 842px) {
    margin-left: 4px;
    margin-right: 4px;
    height: 30px;
    width: 30px;
  }
  @media (max-width: 568px) {
    height: 25px;
    width: 25px;
  }
`;

export const ContainerRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

export const ContainerInform = styled.div`

  width: 120px;
  height: 70px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column; /* Organiza a imagem e informações verticalmente */
  align-items: center;
  margin: 15px;
  padding: 10px;
  
`; 

export const StyledIcon = styled(FontAwesomeIcon)`
 color:#bbb;
 font-size:25px;
`;

export const ContainerEditar = styled.div`
  margin-top:30px;
  margin-left:150px;
  background-color: #ffffff00;
  cursor:pointer;
`; 
export const ContainerDivider = styled.div`
  width:100%;
height: 2px;
  background-color: #ccc;

`; 
export const ContainerDiv1 = styled.div`
width:100%;
   display: flex;
  flex-direction: column;
  height: 65%; 
  align-items:center;

`; 
export const ContainerDiv2 = styled.div`
width:100%;
display: flex;
  flex-direction: column;
 
  align-items:center;

`; 