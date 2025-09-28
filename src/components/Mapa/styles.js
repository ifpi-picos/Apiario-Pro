import styled from "styled-components";

export const MapaContainer = styled.div`
  width: 100%;  
  max-width: 800px;
  height: 70vh;
  margin: 0px;
  border-radius: 10px;
  overflow: hidden;

  position: relative;  /* importante para camada interna do mapa */
  z-index: 0; /* garante que ele fique atrás da sidebar */

  .leaflet-container {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 0; /* todas as camadas internas do Leaflet herdam */
  }

  .leaflet-pane {
    z-index: 0;
  }
  .leaflet-tile-pane,
  .leaflet-overlay-pane,
  .leaflet-shadow-pane,
  .leaflet-marker-pane,
  .leaflet-tooltip-pane,
  .leaflet-popup-pane {
    z-index: 0;
  }
`;
