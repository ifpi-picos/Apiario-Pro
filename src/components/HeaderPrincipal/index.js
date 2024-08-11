import { useNavigate } from "react-router-dom";
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
} from "./styles";

function Header(){
  const navigate = useNavigate();
  return (
    <ContainerHeader>
      <ContainerLogo>
        <Link onClick={() => navigate("/")}>

        </Link>
      </ContainerLogo>
      <ContainerButtons>
        <InputPesquisa
          maxLength={40}
          type="text"
          placeholder="PESQUISAR"
           
        />
        <ContainerButtonsModal>
        
          <ButtonAviso></ButtonAviso>
         
        </ContainerButtonsModal>
      </ContainerButtons>
      <ContainerPerfil>
      
        <ContainerImgPerfil>
          <LinkPerfil >
            <ImagePerfil />
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