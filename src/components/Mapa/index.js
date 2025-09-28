import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ícone da posição do usuário
const userLocationIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [20, 30],
  iconAnchor: [10, 25],
  popupAnchor: [0, -10],
});

// Centraliza o mapa na posição do usuário
const SetViewOnLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 13);
  }, [position, map]);
  return null;
};

const Mapa = () => {
  const [userPosition, setUserPosition] = useState(null);

  // Captura a localização do usuário
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        (error) => console.error("Erro ao obter localização:", error)
      );
    }
  }, []);

  return (
    <MapContainer
      center={[-5.09, -42.80]} // posição inicial padrão
      zoom={13}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {userPosition && <SetViewOnLocation position={userPosition} />}

      {userPosition && (
        <Marker position={userPosition} icon={userLocationIcon}>
          <Popup>Você está aqui!</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Mapa;
