import React, { useState, useEffect } from "react";
import axios from "axios";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  ContainerAdicionarApiario,
  ContainerH2Apiario,
  StyledIcon,
  H2AdicionarApiario,
  InputSelect,
  ContainerButtonExit,
  FormDetalhesApiario,
  ContainerDescricaoApiario,
  H4InfomacoesInputs,
  DivButtonNovaApiario,
  ButtonCriarApiario,
  ButtonCancelar,
  ModalBackground,
  ContainerButton,
  ContainerInput,
  ButtonCaptura,
} from "./styles";

const ModalApiario = ({ isOpen, closeModalApiario, onAddApiario, token }) => {
  const [formState, setFormState] = useState({
    regiao: "",
    florada: "",
    nomeFlorada: "",
    colmeias: "",
    imagem: "",
    latitude: null,
    longitude: null,
  });

  const [floradas, setFloradas] = useState([]);

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

  // 🔹 Capturar coordenadas
  const handleCaptureCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setFormState((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
          alert(`Coordenadas capturadas:\nLat: ${latitude}, Lng: ${longitude}`);
        },
        (err) => {
          console.error("Erro ao capturar localização:", err);
          alert("Não foi possível capturar a localização. Verifique as permissões.");
        }
      );
    } else {
      alert("Geolocalização não suportada pelo navegador.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { regiao, florada, nomeFlorada, colmeias, imagem, latitude, longitude } = formState;

    if (!regiao || !florada || !colmeias || latitude === null || longitude === null) {
      alert("Preencha todos os campos obrigatórios e capture a coordenada.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Erro: Usuário não autenticado.");
      return;
    }

    try {
      const response = await axios.post(
        "https://projeto-full-stack-apiariopro.onrender.com/apiarios/cadastrar",
        {
          regiao,
          florada,
          nomeFlorada,
          colmeias,
          imagem,
          latitude,
          longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onAddApiario(response.data);
      setFormState({ regiao: "", florada: "", nomeFlorada: "", colmeias: "", imagem: "", latitude: null, longitude: null });
      closeModalApiario();
    } catch (error) {
      alert("Erro ao cadastrar apiário.");
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "florada") {
      const floradaSelecionada = floradas.find((florada) => florada.id === parseInt(value));

      setFormState({
        ...formState,
        florada: value,
        nomeFlorada: floradaSelecionada ? floradaSelecionada.nome : "",
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "apiario_upload");
    formData.append("cloud_name", "dpjg8bkba");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpjg8bkba/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;
      setFormState({ ...formState, imagem: imageUrl });
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      alert(`Erro ao enviar a imagem: ${error.response ? error.response.data.error.message : error.message}`);
    }
  };

  const handleClose = () => {
    setFormState({ regiao: "", florada: "", colmeias: "", imagem: "", latitude: null, longitude: null });
    closeModalApiario();
  };

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <Dialog open={isOpen}>
        <ContainerAdicionarApiario>
          <ContainerH2Apiario>
            <H2AdicionarApiario>ADICIONAR APIÁRIO</H2AdicionarApiario>
            <ContainerButtonExit>
              <StyledIcon icon={faClose} onClick={handleClose} />
            </ContainerButtonExit>
          </ContainerH2Apiario>
          <FormDetalhesApiario onSubmit={handleSubmit}>
            <ContainerDescricaoApiario>
              <H4InfomacoesInputs>REGIÃO</H4InfomacoesInputs>
              <InputSelect type="text" name="regiao" value={formState.regiao} onChange={handleChange} maxLength={20}/>
            </ContainerDescricaoApiario>

            <ContainerDescricaoApiario>
              <H4InfomacoesInputs>FLORADA</H4InfomacoesInputs>
              <select
                name="florada"
                value={formState.florada}
                onChange={handleChange}
                style={{
                  width: "60%",
                  padding: "8px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Selecione uma florada</option>
                {floradas.map((florada) => (
                  <option key={florada.id} value={florada.id}>
                    {florada.nome}
                  </option>
                ))}
              </select>
            </ContainerDescricaoApiario>

            <ContainerDescricaoApiario>
              <H4InfomacoesInputs>COLMEIAS</H4InfomacoesInputs>
              <InputSelect
                type="number"
                name="colmeias"
                value={formState.colmeias}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 6) {
                    handleChange(e);
                  }
                }}
              />
            </ContainerDescricaoApiario>

            <ContainerDescricaoApiario>
              <H4InfomacoesInputs>IMAGEM</H4InfomacoesInputs>
              <ContainerInput type="file" accept="image/*" onChange={handleImageChange} />
            </ContainerDescricaoApiario>

            {formState.imagem && (
              <ContainerDescricaoApiario>
                <img
                  src={formState.imagem}
                  alt="Imagem do Apiário"
                  style={{ width: "100px", height: "100px", marginTop: "10px", borderRadius: "8px" }}
                />
              </ContainerDescricaoApiario>
            )}

            {/* 🔹 Botão de capturar coordenada */}
            <ContainerDescricaoApiario>
              <H4InfomacoesInputs>LOCALIZAÇÃO</H4InfomacoesInputs>
              <ButtonCaptura type="button" onClick={handleCaptureCoordinates}>
                CAPTURAR
              </ButtonCaptura>
              {formState.latitude && formState.longitude && (
                <p>
                  Lat: {formState.latitude}, Lng: {formState.longitude}
                </p>
              )}
            </ContainerDescricaoApiario>

            <ContainerButton>
              <DivButtonNovaApiario>
                <ButtonCriarApiario type="submit">ADICIONAR</ButtonCriarApiario>
              </DivButtonNovaApiario>
              <DivButtonNovaApiario>
                <ButtonCancelar type="button" onClick={handleClose}>
                  CANCELAR
                </ButtonCancelar>
              </DivButtonNovaApiario>
            </ContainerButton>
          </FormDetalhesApiario>
        </ContainerAdicionarApiario>
      </Dialog>
    </ModalBackground>
  );
};

export default ModalApiario;
