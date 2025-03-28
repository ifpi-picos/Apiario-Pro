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
  ModalBackground,
  ContainerButton,
  ContainerInput,
} from "./styles";

const ModalEditarApiario = ({ isOpen, closeModalEditar, apiario, onUpdateApiario, token }) => {
  const [formState, setFormState] = useState({
    regiao: "",
    florada: "",
    nomeFlorada: "",
    colmeias: "",
    imagem: "",
  });

  const [floradas, setFloradas] = useState([]);

  // 🔹 Preencher formulário quando a modal abrir
  useEffect(() => {
    if (apiario) {
      setFormState({
        regiao: apiario.regiao || "",
        florada: apiario.florada || "",
        nomeFlorada: apiario.nomeFlorada || "",
        colmeias: apiario.colmeias || "",
        imagem: apiario.imagem || "",
      });
    }
  }, [apiario]);

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

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!formState.regiao || !formState.florada || !formState.colmeias) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      alert("Erro: Usuário não autenticado.");
      return;
    }

    try {
      const response = await axios.put(
        `https://projeto-full-stack-apiariopro.onrender.com/apiarios/${apiario.id}`,
        {
          regiao: formState.regiao,
          florada: formState.florada,
          nomeFlorada: formState.nomeFlorada,
          colmeias: formState.colmeias,
          imagem: formState.imagem,
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      onUpdateApiario(response.data);
      closeModalEditar();
    } catch (error) {
      alert("Erro ao atualizar apiário.");
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

  // 🔹 Função para processar a imagem e armazenar em Base64
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
    closeModalEditar();
  };

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <Dialog open={isOpen}>
        <ContainerAdicionarApiario>
          <ContainerH2Apiario>
            <H2AdicionarApiario>EDITAR APIÁRIO</H2AdicionarApiario>
            <ContainerButtonExit>
              <StyledIcon icon={faClose} onClick={handleClose} />
            </ContainerButtonExit>
          </ContainerH2Apiario>
          <FormDetalhesApiario onSubmit={handleUpdate}>
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
                style={{ width: "60%", padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
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
              <InputSelect type="number" name="colmeias" value={formState.colmeias} onChange={handleChange}/>
            </ContainerDescricaoApiario>

            <ContainerDescricaoApiario>
              <H4InfomacoesInputs>IMAGEM</H4InfomacoesInputs>
              <ContainerInput type="file" accept="image/*" onChange={handleImageChange} />
            </ContainerDescricaoApiario>

            {formState.imagem && (
              <ContainerDescricaoApiario>
                <img src={formState.imagem} alt="Imagem do Apiário" style={{ width: "100px", height: "100px", marginTop: "10px", borderRadius: "8px" }} />
              </ContainerDescricaoApiario>
            )}

            <ContainerButton>
              <DivButtonNovaApiario>
                <ButtonCriarApiario type="submit">ATUALIZAR</ButtonCriarApiario>
              </DivButtonNovaApiario>
              <DivButtonNovaApiario>
                <ButtonCriarApiario type="button" onClick={handleClose}>CANCELAR</ButtonCriarApiario>
              </DivButtonNovaApiario>
            </ContainerButton>
          </FormDetalhesApiario>
        </ContainerAdicionarApiario>
      </Dialog>
    </ModalBackground>
  );
};

export default ModalEditarApiario;
