import React, { useState, useEffect } from "react";
import Header from "../../components/HeaderPrincipal/index.js";
import Mapa from "../../components/Mapa/index.js";
import { 
  AppBody, 
  Main, 
  ContainerTitulo,
  TituloMap,
  MapaContainer,
  
} from "./styles";
import { ContainerPrincipal } from "../Apiarios/styles.js";

const Geolocalizacao = () => {
  
  return (
    <AppBody>
      <Header />
      <Main>
        <ContainerPrincipal>
        <ContainerTitulo>
            <TituloMap>GEOLOCALIZAÇÃO</TituloMap>
        </ContainerTitulo>
        <MapaContainer> 
            <Mapa />
          </MapaContainer>
        </ContainerPrincipal>

      </Main>
    </AppBody>
  );
};

export default Geolocalizacao;
