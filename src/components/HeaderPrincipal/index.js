import { useNavigate } from "react-router-dom";
import Perfil from "../../assets/perfil.png";
import {
  ContainerHeader,
  ContainerLogo,
  ContainerButtons,
  InputPesquisa,
  ContainerButtonsModal,
  ButtonAdicionar,
  ButtonAviso,
  ButtonDesempenho,
  ContainerPerfil,
  LinkMenu,
  Pnome,
  Link,
  ContainerImgPerfil,
  LinkPerfil,
  ImagePerfil,
  ContainerSubMenu,
  MenuButton,
  StyledIcon,
} from "./styles";
import {
  faBars,
 
} from "@fortawesome/free-solid-svg-icons";
import SideBar from "../MenuLateral/index";
import { useAuth } from "../../contexts/AuthContext"; 

function Header(){
  const navigate = useNavigate();
  const { isActive, setIsActive } = useAuth(); // Acesse isActive e setIsActive

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };
  return (
    <ContainerHeader>
       <MenuButton onClick={toggleSidebar}>
            <StyledIcon icon={faBars} />
          </MenuButton>
     <SideBar/>
      <ContainerButtons>
       
        <ContainerButtonsModal>
          <ButtonDesempenho onClick={() => navigate("/Gestao")}></ButtonDesempenho>
          <ButtonAviso></ButtonAviso>
        </ContainerButtonsModal>
      </ContainerButtons>
      <ContainerPerfil>
      <Pnome>Daniel Reis</Pnome>
        <ContainerImgPerfil>
          <LinkPerfil >
            <ImagePerfil src={Perfil} alt={"perfil"} />
          </LinkPerfil>
          <ContainerSubMenu >
            <LinkMenu >EDITAR PERFIL</LinkMenu>
            <LinkMenu >CONFIGURAÇÕES</LinkMenu>
            <LinkMenu >
              SAIR
            </LinkMenu>
          </ContainerSubMenu>
        </ContainerImgPerfil>
      </ContainerPerfil>
      
    </ContainerHeader>
  );
};

export default Header;