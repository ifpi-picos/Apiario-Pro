import styled from "styled-components";

export const AppBody = styled.div`
    margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100vh;
  padding-top: 4em; /* Adiciona espaço para o header */
`;

export const Main = styled.main`

`;
export const ContainerPrincipal = styled.div`

display: flex;
  flex-direction: column;
  height: 78vh; 
  
`;
export const ContainerTitulo = styled.div`

text-align:center;
`;
export const TituloMap = styled.h2`

`;
export const MapaContainer = styled.div`
  width: 100%;  
  max-width: 800px; /* Define um limite de largura */
  height: 70vh;  /* Define a altura do mapa */
  margin: 20px auto; /* Centraliza o mapa */
  border-radius: 10px; /* Opcional: adiciona bordas arredondadas */
  overflow: hidden; /* Garante que o Leaflet não ultrapasse */
  border: 2px solid #ddd; /* Borda para melhor visualização */
`;

