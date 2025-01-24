import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Adicionar from "../../assets/adicionar.png";
import { IoIosAddCircleOutline } from "react-icons/io";
export const AppBody = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  height: 100vh;
`;
export const Header = styled.div`
margin:2em;
`;
export const Nav= styled.div`

display: flex;
justify-content: space-between;
align-items:center;
  
`;
export const Main = styled.div`

`;
export const Container = styled.div`
display: flex;
  flex-direction: column;
  height: 100%; 
`;
export const ContainerPrincipal = styled.div`
 
`;

export const Text = styled.p`
display: flex;
font-weight: bold;
  justify-content: center;



`;
export const ContainerClima = styled.div`
width: 100%;
text-align: center;
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
export const Footer = styled.footer`
  background-color: #ffffff;
  padding: 10px 0;
 
`;
export const Form = styled.form`
    display: flex;
    align-items: center;
    
  `;
  
  export const Input = styled.input`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
  `;
  export const Ul = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
  `;
  
  export const Li = styled.li`
    cursor: pointer;
    padding: 8px;
  `;
  

export const ContainerForm= styled.div`
display:column;
margin-left:auto;

`;
export const Button = styled.button`
  
`;
export const WeatherInfo = styled.div`
 
`;
export const Icon = styled.img`
 
`;

export const BotaoContainer = styled.div`

 
  display: flex;
  flex-wrap: wrap; /* Permite que os itens "quebrem" para a próxima linha */
  justify-content: center; /* Centraliza os botões horizontalmente */
  gap: 20px; /* Espaçamento entre os botões */
  padding: 20px; /* Espaçamento interno opcional */
  max-width: 1250px; /* Define uma largura máxima, se necessário */
  margin: 0 auto; /* Centraliza o contêiner na página */




`;
export const ContainerFlorada = styled.button`
  width: 300px;
  height: auto;
  background-color: #ffeed8;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column; /* Organiza a imagem e informações verticalmente */
 
  margin: 20px;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color:rgb(240, 197, 140);
  }
`;

export const Florada = styled.p`
display: flex;
font-weight: bold;
  margin-bottom: 10px; /* Espaço entre a imagem e os itens */
  font-size:15px;
`;

export const Informacoes = styled.div`
  display: flex;
  flex-direction: column; /* Organiza as informações em coluna */
  align-items: center; /* Centraliza o texto */
  gap: 5px; /* Espaço entre os itens */
   align-items: flex-start; /* Alinha os itens à esquerda */
   

`;

export const InfoItem = styled.span`
  font-size: 14px;
  
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
  background-color:rgba(255, 238, 216, 0);
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
   
  }
  @media (max-width: 568px) {
    
  }
`;
export const ContainerInform = styled.div`
display: flex;



`; 
export const StyledIcon = styled(IoIosAddCircleOutline)`
  color: black;
  font-size: 44px;
  cursor: pointer;
  transition: transform 0.2s ease;
  

  
`;
export const ContainerEditar = styled.div`
margin-top:30px;
 margin-left:150px;
  background-color: #ffffff00;
  cursor:pointer;
  

`; 
