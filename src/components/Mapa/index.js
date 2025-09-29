import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { MapaContainer } from "./styles";

// Configure seu token do Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoiZGFuaWVscmRjIiwiYSI6ImNtN3dwd212aDA4a3YybXBxYzRscWFjcnEifQ.wf_h7iKJAzYN1Z1FvBVdsQ";

const Mapa = () => {
  const { token } = useAuth();
  const mapaRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [apiarios, setApiarios] = useState([]);
  const [floradas, setFloradas] = useState([]);
  const floradasMap = {};
floradas.forEach(f => {
  floradasMap[f.id] = f.nome;
});

useEffect(() => {
  const fetchFloradas = async () => {
    try {
      const storedToken = token || localStorage.getItem("token");
      if (!storedToken) return;

      const response = await axios.get(
        "https://projeto-full-stack-apiariopro.onrender.com/floradas",
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      setFloradas(response.data);
    } catch (error) {
      console.error("Erro ao buscar floradas:", error);
    }
  };

  fetchFloradas();
}, [token]);

  // Captura a localização do usuário
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([longitude, latitude]); // Mapbox usa [lng, lat]
        },
        (error) => console.error("Erro ao obter localização:", error)
      );
    }
  }, []);

  // Inicializa o mapa
  useEffect(() => {
    if (!map && mapaRef.current) {
      const initializeMap = new mapboxgl.Map({
        container: mapaRef.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [-42.80, -5.09], // centro inicial
        zoom: 13,
      });

      setMap(initializeMap);
    }
  }, [map]);

  // Adiciona marcador do usuário
  useEffect(() => {
    if (map && userPosition) {
      new mapboxgl.Marker({ color: "blue" })
        .setLngLat(userPosition)
        .setPopup(new mapboxgl.Popup().setText("Você está aqui!"))
        .addTo(map);

      // Centraliza o mapa na posição do usuário
      map.flyTo({ center: userPosition, zoom: 13 });
    }
  }, [map, userPosition]);

  // Carrega os apiários
  useEffect(() => {
    const fetchApiarios = async () => {
      try {
        const storedToken = token || localStorage.getItem("token");
        if (!storedToken) return;

        const response = await axios.get(
          "https://projeto-full-stack-apiariopro.onrender.com/apiarios",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        setApiarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar apiários:", error);
      }
    };

    fetchApiarios();
  }, [token]);

  // Adiciona marcadores dos apiários
  useEffect(() => {
    if (map) {
      apiarios.forEach((apiario) => {
        const nomeFlorada = floradasMap[apiario.florada] || "Desconhecida";
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <strong>Região:</strong> ${apiario.regiao}<br/>
          <strong>Colmeias:</strong> ${apiario.colmeias}<br/>
          <strong>Florada:</strong> ${nomeFlorada}<br/>
          <strong>Coordenadas:</strong> Lat: ${apiario.latitude}, Lng: ${apiario.longitude}
        `);

        new mapboxgl.Marker({ color: "red" })
          .setLngLat([apiario.longitude, apiario.latitude])
          .setPopup(popup)
          .addTo(map);
      });
    }
  }, [map, apiarios]);

  return <MapaContainer ref={mapaRef} style={{ width: "100%", height: "500px" }} />;
};

export default Mapa;
