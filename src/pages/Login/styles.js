import styled from "styled-components";
import EmailIcon from "../../assets/email.png";
import senhaIcon from "../../assets/senha.png";
export const AppBody = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
background-color:#ffc400;
 
  
`;
export const Header = styled.div`

`;
export const Main = styled.div`
height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
 
`;
export const ContainerPrincipal = styled.div`
display: flex;
   
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
export const ContainerTitulo = styled.div`
display: flex;
    width: 100%;
    
    align-items: center;
    justify-content: center;
    
`;

export const H1 = styled.h1`
margin: 1em 0.2em 1px; 
color:white;  
display: flex;
max-width: 341px;
padding-bottom: 20px;
border-bottom: 1px solid #3c3b3b4d;
@media (max-width: 388px) {
  max-width: 308px;
}
@media (max-width: 359px) {
  max-width: 228px;
}
`;



export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.3); 
  border-radius: 15px;
  padding: 2em 4em 4em 4em;
  align-items: center;


  @media (max-width: 715px) {
    padding: 2em 1.5em 4em 1.5em;
  }
  
  @media (max-width: 555px) {
    padding: 20px;
  }
`;





export const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const EmailIcone = styled.div`
  width: 1.8em;
  height: 1.9em;
  background-image: url(${EmailIcon});
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  top: 8px;
  margin-right: 5px;
`;

export const PasswordIcone = styled(EmailIcone)`
  background-image: url(${senhaIcon});
`;

export const Input = styled.input`
  border: none;
  border-radius: 10px;
  height: 40px;
  margin-top: 15px;
  font-size: 17px;
  color: #3c3b3b;
  background-size: 25px;
  padding-left: 8px;
  min-width: 308px;
  margin-bottom: ${(props) => (props.$lastinput ? "15px" : "0")};
  &::placeholder {
    font-weight: bold;
    @media (max-width: 555px) {
      font-size: 13px;
    }
  }
  @media (max-width: 555px) {
    min-width: 280px;
    font-size: 14px;
  }

  @media (max-width: 390px) {
    min-width: 203px;
    font-size: 14px;
  }
`;

export const ContainerText = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding-top: 8px;
  align-items: center;
`;
export const Button = styled.button`
margin:5px;
border-radius:15px;
border:none;
height:38px;
width:100%;
font-weight: 700;
background-color:#3c3b3b; /* Cor de fundo escura com 50% de opacidade */
  color: #ffffff; 
  cursor:pointer;
`;
export const ContainerButton = styled.div`
display: flex;
flex-direction: column;
margin:10px;
width:150px;
`;
export const ContainerTextBorda = styled.div`
  border-top: 1px solid #3c3b3b4d;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;
export const PCadastreSe = styled.p`
  font-size: 14px;
  font-weight: 700;
  margin-right: 5px;
  margin-top: 15px;
  margin-bottom: 0;
  color:white;
`;
export const LinkCadastreSe = styled.a`
  
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  margin-top: 15px;
  &:hover {
   
    text-decoration: underline;
  }
`;
