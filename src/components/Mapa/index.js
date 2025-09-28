import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ícone personalizado para a localização do usuário
const userLocationIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [20, 30],
  iconAnchor: [10, 25],
  popupAnchor: [0, -10],
});
const clickedMarkerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  
  iconSize: [20, 30],
  iconAnchor: [10, 25],
  popupAnchor: [0, -10],
  
});

// Função para salvar a localização (simulação ou API)
const saveLocation = async (lat, lng) => {
  try {
    console.log(`Localização gravada: Latitude ${lat}, Longitude ${lng}`);
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
      map.setView(position, 13);
    }
  }, [position, map]);
  return null;
};

// Novo componente que escuta os cliques no mapa
const ClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const Mapa = () => {
  const [userPosition, setUserPosition] = useState(null);
const [clickedMarkers, setClickedMarkers] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    }
  }, []);

 const handleMapClick = ({ lat, lng }) => {
  // Adiciona o novo marcador ao array de todos os cliques
  setClickedMarkers([...clickedMarkers, { lat, lng }]);
  saveLocation(lat, lng);
};

  return (
    <MapContainer
      center={[-5.09, -42.80]}
      zoom={10}
      style={{ width: "100%", height: "500px" }}
    >
<TileLayer
  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  attribution="Tiles &copy; <a href='https://www.esri.com/'>ESRI</a>"
/>
      {userPosition && <SetViewOnLocation position={userPosition} />}

      {userPosition && (
        <Marker position={userPosition} icon={userLocationIcon}>
          <Popup>Você está aqui!</Popup>
        </Marker>
      )}

    {clickedMarkers.map((marker, index) => (
  <Marker
    key={index}
    position={[marker.lat, marker.lng]}
    icon={clickedMarkerIcon}
    eventHandlers={{
      click: () => {
        // Remove apenas o marcador que foi clicado
        setClickedMarkers(clickedMarkers.filter((_, i) => i !== index));
      },
    }}
  >
    <Popup>
      Local selecionado:<br />
      Latitude: {marker.lat.toFixed(5)}<br />
      Longitude: {marker.lng.toFixed(5)}<br />
      <em>Clique no marcador para removê-lo</em>
    </Popup>
  </Marker>
))}

      {/* Ouvindo os cliques do usuário */}
      <ClickHandler onMapClick={handleMapClick} />
    </MapContainer>
  );
};

export default Mapa;
