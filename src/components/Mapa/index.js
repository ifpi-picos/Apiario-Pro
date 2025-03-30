import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ícone personalizado para a localização do usuário
const userLocationIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [20, 30],
  iconAnchor: [10, 25],
  popupAnchor: [0, -10],
});

// Função para salvar a localização (simulação ou API)
const saveLocation = async (lat, lng) => {
  try {
    // Simulação de gravação, por exemplo, enviando para uma API ou armazenando no localStorage
    console.log(`Localização gravada: Latitude ${lat}, Longitude ${lng}`);
    
    // Exemplo de requisição para API
    // const response = await fetch("/api/salvar-localizacao", {
    //   method: "POST",
    //   body: JSON.stringify({ latitude: lat, longitude: lng }),
    //   headers: { "Content-Type": "application/json" },
    // });

    // Simulando o armazenamento local
    localStorage.setItem("savedLocation", JSON.stringify({ latitude: lat, longitude: lng }));
    alert("Localização salva com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar localização:", error);
  }
};

// Componente para centralizar o mapa após carregar a localização
const SetViewOnLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13); // Centraliza o mapa na posição do usuário
    }
  }, [position, map]);
  return null;
};

const Mapa = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]); // Define a posição do usuário
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    }
  }, []);

  const handleClick = (event) => {
    const { lat, lng } = event.latlng;
    setMarkerPosition([lat, lng]); // Define a posição do marcador no clique
    saveLocation(lat, lng); // Salva a localização quando clicado
  };

  return (
    <MapContainer
      center={[-5.09, -42.80]} // Posição inicial antes da localização ser carregada
      zoom={10}
      style={{ width: "100%", height: "500px" }}
      onClick={handleClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Centraliza o mapa na localização do usuário quando disponível */}
      {userPosition && <SetViewOnLocation position={userPosition} />}

      {/* Adiciona o marcador da posição do usuário */}
      {userPosition && (
        <Marker position={userPosition} icon={userLocationIcon}>
          <Popup>Você está aqui!</Popup>
        </Marker>
      )}

      {/* Adiciona o marcador do local clicado */}
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>
            Local selecionado:<br />
            Latitude: {markerPosition[0].toFixed(5)}<br />
            Longitude: {markerPosition[1].toFixed(5)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Mapa;
