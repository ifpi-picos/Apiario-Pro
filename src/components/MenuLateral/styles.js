import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MainPrincipal = styled.div`
  display: flex;
`;

export const DivLateral = styled.div`
height: 100%;
`;
export const SideBar = styled.div`
   width: 193px;
  height: 100vh; /* Mudar para 100vh para preencher a altura da tela */
  position: fixed; /* Mude para fixed se você quer que ela fique fixa na tela */
  top: 0;
  left: -106%; /* Esta propriedade controla a visibilidade */
  overflow-y: auto;
  transition: 0.6s ease;
  transition-property: left;
  background-color: #ffc400;
  box-shadow: 3px 2px 11px 2px #031E2C;

  ${props => props.$active && css`
    left: 0;
    
  `}
  @media (max-height: 800px) {
    height: 100%
  }

  @media (max-width:555px){
    position: fixed;
    top: 0px;
    z-index:1000;
  }
  
  `;

export const Menu = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const P = styled.p`
    font-size: 10px;
    margin: 0;

    text-align: center;
    position: relative;
    bottom: 20px;
    right: 12px;
`

export const MenuItem = styled.div`
  position: relative;

  a {
    
    font-size: 16px;
    text-decoration: none;
    display: block;
    padding: 5px 27px;
    line-height: 40px;
    font-weight: 600;

    &:hover {
        background-color: rgba(0, 0, 0, 0.3);
      transition: 0.3s ease;
    }
  }

  i {
    margin-right: 8px;
    font-size: 23px;
  }
  ${props => props.$active && css`
  background-color: rgba(0, 0, 0, 0.3);
  `}
  cursor: ${(props) => (props.$desenvolvimento ? "not-allowed" : "pointer")};
`;

export const Border = styled.div`
  margin: 0.5em 0px;
  height: 3px;
  width: 77%;
  background-color: #FFF;
`;

export const CloseButton = styled.div`
 color: #fff;
  font-size: 20px;
  cursor: pointer;
  
`;

export const MenuButton = styled.div`
  position: absolute;
  color: #fff;
  font-size: 20px;
  margin: 25px;
  cursor: pointer;
  @media (max-width:555px){
    margin: 5px;
    z-index: 100;
  }
`;

export const LinkSideBar = styled.a`

`
export const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
 color: black;
`;


export const NavLateral = styled.nav`
  height: 100%;
  

  @media (max-height: 800px) {
      height: 100%;
    }

    
`;
export const HeaderSidebar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height:0;
  margin-top:10px;

  
`;

export const Imagem = styled.img`
  width: 120px;
  margin-left:-40px;
  

  
`;