import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
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
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../MenuLateral/index";
import { useAuth } from "../../contexts/AuthContext"; // Importando o useAuth para acessar o contexto

function Header() {
  const navigate = useNavigate();
  const { logout, nome, isActive, setIsActive } = useAuth(); // Pegando 'nome' do contexto
  
  const [showModalDesempenho, setShowModalDesempenho] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  // Função para deslogar o usuário e redirecionar para login
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redireciona para a tela de login
  };
  console.log("Nome do usuário:", nome);

  return (
    <ContainerHeader>
      <MenuButton onClick={toggleSidebar}>
        <StyledIcon icon={faBars} />
      </MenuButton>
      <SideBar />
      <ContainerButtons>
        <ContainerButtonsModal>
          <ButtonDesempenho onClick={() => navigate("/Gestao")}></ButtonDesempenho>
          <ButtonAviso></ButtonAviso>
        </ContainerButtonsModal>
      </ContainerButtons>
      <ContainerPerfil>
        <Pnome> {nome || "Visitante"}</Pnome> {/* Exibe o nome do usuário */}
        <ContainerImgPerfil>
          <LinkPerfil onClick={toggleSubMenu}>
            <ImagePerfil src={Perfil} alt={"Imagem-perfil"} />
          </LinkPerfil>
          <ContainerSubMenu $active={showSubMenu ? "true" : undefined}>
            <LinkMenu onClick={() => navigate("/perfil")}>EDITAR PERFIL</LinkMenu>
            <LinkMenu $desenvolvimento>CONFIGURAÇÕES</LinkMenu>
            <LinkMenu $lastLinkPerfil onClick={handleLogout}>
              SAIR
            </LinkMenu>
          </ContainerSubMenu>
        </ContainerImgPerfil>
      </ContainerPerfil>
    </ContainerHeader>
  );
};

export default Header;
