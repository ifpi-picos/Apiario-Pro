import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Adicionar from "../../assets/adicionar.png";
import { IoIosAddCircleOutline } from "react-icons/io";
export const AppBody = styled.div`
   margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 115vh;
  padding-top: 4em; /* Adiciona espaço para o header */
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
  justify-content: space-between;
  
 
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


export const ContainerAdicionar = styled.div`
  position: fixed; /* Fixa o elemento na tela */
  bottom: 35px; /* Distância do canto inferior */
  right: 35px; /* Distância do canto direito */
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 842px) {
    bottom: 70px; /* Ajuste para telas menores */
    right: 45px;
  }
      @media (max-width: 582px) {
    bottom: 70px; /* Ajuste para telas menores */
    right: 45px;
  }
    &:hover {
    transform: scale(1.1);
  }

  /* Tooltip */
  &::after {
    content: "Adicionar"; /* Texto da tooltip */
    position: absolute;
    bottom: 40px; /* Ajuste para exibir abaixo do ícone */
    left: 50%;
    transform: translateX(-50%);
    
    color: black;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0; /* Invisível inicialmente */
    pointer-events: none;
    transition: opacity 0.3s ease;
    
  }

  &:hover::after {
    opacity: 1; /* Aparece quando o mouse passa */
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

export const StyledIcon = styled(IoIosAddCircleOutline)`
  color: black;
  font-size: 44px;
  cursor: pointer;
  transition: transform 0.2s ease;
  

  
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
  height: 70%; 
  align-items:center;

`; 
export const ContainerDiv2 = styled.div`
width:100%;
display: flex;
  flex-direction: column;
 
  align-items:center;

`; 
export const Icone = styled.img`
  width: 35px;
  height: 35px;
  border: none;
  margin-left: 10px;
 
   margin-top:10px;
  
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
export const Total = styled.div`
 margin-left: 10px;
   margin-top:15px;
   display: flex;
  font-weight: bold;
  justify-content: center;
  

`; 
export const TextImg = styled.div`

   display: flex;
 
  

`; 