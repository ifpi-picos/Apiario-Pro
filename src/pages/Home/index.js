import React, { useState } from 'react';

import Header from "../../components/HeaderPrincipal/index.js";
import SideBar from "../../components/MenuLateral/index.js";
import {
  AppBody,
 
  Nav,
  Main,

  ContainerPrincipal,
  Footer,
 
} from './styles'; // Supondo que você tenha seus estilos em um arquivo separado

function Home() {
  
 

  
  return (
    <AppBody>
      
      <Header/>
      <SideBar />
      <Main>

        <ContainerPrincipal>
          
          
        </ContainerPrincipal>
      </Main>
      <Footer></Footer>
    </AppBody>
  );
}

export default Home;
