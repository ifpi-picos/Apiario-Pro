import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Rendimento from "../../assets/grafico.png";
import Aviso from "../../assets/notificacoes.png";
export const AppBody = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  height: 100vh;
`;

export const MenuButton = styled.div`
  position: absolute;
  color: #fff;
  font-size: 20px;
  margin: 25px;
  cursor: pointer;
  @media (max-width:555px){
   
    z-index: 100;
  }
`;
export const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
 color: black;
`;
export const ContainerHeader = styled.div`
  width: 100%;
  height: 4em;
  display: flex;
  background-color: #ffc400;
  align-items: center;
  justify-content: space-between;
`;
export const ContainerLogo = styled.div`
  max-width: 150px;
  margin-left: 1em;
  min-width: 8em;
  height: 80%;
  margin: 0 0.5em 0 1em;
  width: 20%;
  max-width: 12em;
  display: flex;
  align-items: center;
  @media (max-width: 555px) {
    min-width: 0;
    width: 3em;
    height: 75%;
    margin: 0 0.4em;
  }
`;
export const Link = styled.a``;
export const ContainerImg = styled.div`
 
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
`;
export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
 margin-left:auto;
  justify-content: space-around;
  
`;
export const InputPesquisa = styled.input`
  border: none;
  border-radius: 10px;
  height: 25px;
  margin-top: 15px;
  font-size: 14px;
  color: #3c3b3b;
  background-position: 10px;
  background-repeat: no-repeat;
  background-size: 25px;
  padding-left: 40px;
  min-width: 100px;
  margin: 0 1.2em 0 0;
  width: 10em;
  background-color: #ffffff;

  @media (max-width: 842px) {
    margin-right: 5px;
    min-width: 0;
    width: 10em;
    height: 2em;
  }
  @media (max-width: 568px) {
    height: 28px;
    font-size: 12px;
    background-position: 2px;
    background-size: 20px;
  
  padding-left: 25px;
    &::placeholder {
      font-size: 10px;
    }
  }
`;
export const ContainerButtonsModal = styled.div`
  display: flex;
  justify-content: space-around;
   margin-left: auto;
`;
export const ButtonAdicionar = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background-size: cover;
  background-color: #ffffff00;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  margin-left: 20px;
 
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
export const ButtonAviso = styled.button`
  
  border: none;
  background-size: cover;
  background-color: #ffffff00;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  margin-left: 20px;
    background-image: url(${Aviso});
  width: 30px;
  height: 30px;
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
export const ButtonDesempenho = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background-size: cover;
  background-color: #ffffff00;
  cursor: pointer;
 

  
background-image: url(${Rendimento});
  width: 32px;
  height: 32px;
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
export const ContainerPerfil = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
  width: 15%;
  justify-content: flex-end;

  @media (max-width: 842px) {
    margin-left: 5px;
    flex-direction: column-reverse;
    text-align: center;
  }
`;
export const Pnome = styled.p`
  margin: 0;
  min-width: 103px;
  text-align: right;
  @media (max-width: 842px) {
    font-size: 13px;
    text-align: center;
  }
  @media (max-width: 568px) {
    font-size: 11px;
    min-width: 0;
    text-align: center;
  }
`;
export const ContainerImgPerfil = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const LinkPerfil = styled.a``;

export const ImagePerfil = styled.img`
 margin-left: 5px;
  width: 40px;
  height: 40px;
  @media (max-width: 842px) {
    width: 30px;
    height: 30px;
  }
  @media (max-width: 568px) {
    width: 23px;
    height: 23px;
  }

`;
export const LinkMenu = styled.div`
  text-decoration: none;
  color: #000000;
  padding: 10px 0 13px 0;
  width: 100%;
  text-align: center;
  &:hover {
    background-color:rgb(209, 162, 5);
  }
  cursor: ${(props) => (props.$desenvolvimento ? "not-allowed" : "pointer")};

  border-bottom-left-radius: ${(props) =>
    props.$lastLinkPerfil ? "15px" : ""};
  border-bottom-right-radius: ${(props) =>
    props.$lastLinkPerfil ? "15px" : ""};
`;
export const ContainerSubMenu = styled.div`
  display: none;
  position: absolute;
  top: 64px;
  right: 0px;
  width: 164px;
  background-color: #ffc400;
  padding: 10px;
  box-shadow: 0 3px 3px #00000087;
  z-index: 1;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 0;

  ${(props) =>
    props.$active
      ? "display: flex; flex-direction: column; align-items: center;"
      : ""}
`;
