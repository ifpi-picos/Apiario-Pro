import styled from "styled-components";
export const MapaContainer = styled.div`
  width: 100%;
  height: 500px;
  z-index: 0;
  position: relative;

  /* Garante que o mapa não fique por cima da sidebar */
  .leaflet-container {
    z-index: 0 !important;
  }

  .leaflet-pane,
  .leaflet-map-pane,
  .leaflet-tile-pane,
  .leaflet-overlay-pane,
  .leaflet-shadow-pane,
  .leaflet-marker-pane,
  .leaflet-tooltip-pane,
  .leaflet-popup-pane {
    z-index: 0 !important;
  }
`;
