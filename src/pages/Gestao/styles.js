import styled from "styled-components";
import { IoIosAddCircleOutline } from "react-icons/io";
export const AppBody = styled.div`
   margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100vh;
  padding-top: 4em; /* Adiciona espaço para o header */
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
export const DivPrincipal = styled.div`
padding: 20px;
display: flex;
 flex-direction: column;

`;
export const DivGraf = styled.div`
display: flex;
justify-content: center;
align-items:center;
gap:100px;
@media (max-width: 842px) {
    flex-direction: column;
  gap:10px;
    font-size: 14px;
  }
   @media (max-width: 582px) {
  flex-direction: column;
  gap:10px;
    font-size: 14px;
  }

`;

export const DivStyle1 = styled.div`
width: 25%;
 marginLeft: 60px;
 marginTop:30px;  
    @media (max-width: 842px) {
  width: 50%;
  
  }
 @media (max-width: 582px) {
  width: 70%;
  
  }

`;
export const DivStyle2 = styled.div`
width: 50%;
 marginLeft: 60px;
  marginTop:30px;
   @media (max-width: 842px) {
  width: 50%;
  
  }

   @media (max-width: 582px) {
  width: 100%;
  
  }

`;
export const ContainerH2 = styled.div`
display: flex;
justify-content: space-between;
align-items:center;
  @media (max-width: 950px) {

display: flex;
 flex-direction: column;
 align-items:center;
   }
`;
export const BotaoAno = styled.div`
width:12%;
height:7vh;
@media (max-width: 950px) {
  width: 18%;
  
  }
  @media (max-width: 850px) {
  width: 35%;
  
  }
   @media (max-width: 500px) {
  width: 50%;
  
  }
  
`;
export const StyledIcon = styled(IoIosAddCircleOutline)`
  color: black;
  font-size: 44px;
  cursor: pointer;
  transition: transform 0.2s ease;
  

  
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