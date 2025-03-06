import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importando os estilos do Leaflet
import L from "leaflet"; // Para interações com o Leaflet

const Mapa = () => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleClick = (event) => {
    const { lat, lng } = event.latlng;
    console.log("Latitude:", lat, "Longitude:", lng); // Exibe as coordenadas do clique
    setMarkerPosition([lat, lng]); // Atualiza a posição do marcador
  };

  return (
    <MapContainer
      center={[-5.09, -42.80]} // Posição inicial do mapa
      zoom={10}
      style={{ width: "100%", height: "500px" }} // Tamanho do mapa
      onClick={handleClick} // Evento de clique no mapa
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Adiciona o marcador, se houver uma posição definida */}
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>Você marcou este local!</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Mapa;
