import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Istok Web', sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    font-weight: bold;}
    .leaflet-container {
    width: 100%;
    height: 100%;
    min-height: 500px; /* Garante altura mínima */
    border-radius: 10px;
  }
`;
