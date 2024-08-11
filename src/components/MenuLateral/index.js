import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
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
  StyledIcon,P
} from "./styles";

import {
  faBars,
  faTimes,
  faHome,
  faCalendar,
  faCalendarMinus,
  faBook,
  faShoppingCart,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { setSideBarIsActive, isActive, setIsActive } = useAuth();

  const toggleSidebar = () => {
    setIsActive(!isActive);
    setSideBarIsActive(prevIsActive => !prevIsActive)
  };

  return (
    <MainPrincipal>
      <DivLateral>
        <NavLateral>
          <MenuButton onClick={toggleSidebar}>
            <StyledIcon icon={faBars} />
          </MenuButton>
          <SideBar $active={isActive ? "true" : undefined}>
            <CloseButton onClick={toggleSidebar}>
              <StyledIcon icon={faTimes} />
            </CloseButton>
            <Menu>
              <MenuItem $principal $active={location.pathname === "/home"}>
                <LinkSideBar onClick={() => navigate("/home")}>
                  <StyledIcon icon={faHome} />
                  INÍCIO
                </LinkSideBar>
              </MenuItem>
              <MenuItem $active={location.pathname === "/hoje"}>
                <LinkSideBar onClick={() => navigate("/hoje")}>
                  <StyledIcon icon={faCalendar} />
                      APIÁRIOS
                </LinkSideBar>
              </MenuItem>
              <Border></Border>
              <MenuItem $desenvolvimento>
              <LinkSideBar>
                  <StyledIcon icon={faBook} />
                  FLORADAS
                  </LinkSideBar>
                  <P>(Desenvolvimento)</P>
              </MenuItem>
              <MenuItem $desenvolvimento>
              <LinkSideBar>
                  <StyledIcon icon={faShoppingCart} />
                  COLMEIAS
                  </LinkSideBar>
                  <P>(Desenvolvimento)</P>
              </MenuItem>
              <MenuItem $desenvolvimento>
              <LinkSideBar>
                  <StyledIcon icon={faCalendarAlt} />
                 PRODUÇÃO
                  </LinkSideBar>
                  <P>(Desenvolvimento)</P>
              </MenuItem>
            </Menu>
          </SideBar>
        </NavLateral>
      </DivLateral>
    </MainPrincipal>
  );
};

export default Sidebar;