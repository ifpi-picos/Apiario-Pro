import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/Logo.png";

import {
  MainPrincipal,
  DivLateral,
  NavLateral,
  MenuButton,
  SideBar,
  CloseButton,
  Menu,
  MenuItem,
  LinkSideBar,
  Border,
  StyledIcon,
  P,
  Imagem,
  HeaderSidebar
} from "./styles";

import { faTimes, faHome, faLocationDot, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import FlowerIcon from '@mui/icons-material/LocalFlorist';
import { GiBee } from 'react-icons/gi';
import { TbReportSearch } from "react-icons/tb";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSideBarIsActive, isActive, setIsActive } = useAuth();

  const toggleSidebar = () => {
    setIsActive(!isActive);
    setSideBarIsActive(prevIsActive => !prevIsActive);
  };

  // Fecha a sidebar automaticamente ao mudar de página
  useEffect(() => {
    setIsActive(false);
    setSideBarIsActive(false);
  }, [location.pathname, setIsActive, setSideBarIsActive]);

  return (
    <MainPrincipal>
      <DivLateral>
        <NavLateral>
          <MenuButton onClick={toggleSidebar} />

          <SideBar $active={isActive ? "true" : undefined}>
            <HeaderSidebar>
              <Imagem src={Logo} alt="Logo" />
              <CloseButton onClick={toggleSidebar}>
                <StyledIcon icon={faTimes} />
              </CloseButton>
            </HeaderSidebar>

            <Menu>
              <MenuItem $principal $active={location.pathname === "/home"}>
                <LinkSideBar onClick={() => navigate("/home")}>
                  <StyledIcon icon={faHome} />
                  INÍCIO
                </LinkSideBar>
              </MenuItem>

              <MenuItem $active={location.pathname === "/apiarios"}>
                <LinkSideBar onClick={() => navigate("/apiarios")}>
                  <GiBee size={20} style={{ marginRight: '5px' }} />
                  APIÁRIOS
                </LinkSideBar>
              </MenuItem>

              <MenuItem $active={location.pathname === "/floradas"}>
                <LinkSideBar onClick={() => navigate("/floradas")}>
                  <FlowerIcon style={{ fontSize: 20, marginRight: '5px' }} />
                  FLORADAS
                </LinkSideBar>
              </MenuItem>

              <MenuItem $active={location.pathname === "/colmeias"}>
                <LinkSideBar onClick={() => navigate("/colmeias")}>
                  <StyledIcon icon={faBoxArchive} />
                  COLMÉIAS
                </LinkSideBar>
              </MenuItem>
              <MenuItem $active={location.pathname === "/relatorio"}>
                <LinkSideBar onClick={() => navigate("/relatorio")}>
                <TbReportSearch size={20} style={{ marginRight: '5px' }} />
                  RELATORIO
                </LinkSideBar>
              </MenuItem>


              <Border />

              <MenuItem $active={location.pathname === "/geolocalizacao"}>
                <LinkSideBar  onClick={() => navigate("/geolocalizacao")}>
                  <StyledIcon icon={faLocationDot} />
                  Geolocalização
                   <P>(Em teste)</P>
                </LinkSideBar>
               
              </MenuItem>
            </Menu>
          </SideBar>
        </NavLateral>
      </DivLateral>
    </MainPrincipal>
  );
};

export default Sidebar;
