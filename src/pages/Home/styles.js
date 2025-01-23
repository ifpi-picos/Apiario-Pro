import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AppBody = styled.div`
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
  flex-direction: column; /* Coloca os botões em coluna */
   /* Centraliza verticalmente */
  align-items: center; /* Centraliza horizontalmente */
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
export const P = styled.p`
    font-size: 10px;
    margin: 0;

    text-align: center;
    position: relative;
    bottom: 20px;
    right: 12px;
`
;
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
export const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
 color: black;
`;
export const BotaoContainer = styled.div`

  display: flex;
  /* Centraliza os botões dentro do contêiner */
  /* Margem superior e inferior */
    


`;
export const Botao = styled.button`
   width: 150px;
  height: 100px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px; /* Margem entre os botões */
  cursor: pointer;
  transition: background-color 0.3s;
  

  &:hover {
    background-color: #f0f0f0;
  }
    cursor: ${(props) => (props.$desenvolvimento ? "not-allowed" : "pointer")};

`;

export const BotaoTexto = styled.span`
  margin-top: 10px;
  font-size: 16px;
  color: #000;
`;