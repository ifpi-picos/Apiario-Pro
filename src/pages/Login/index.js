import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext"; 
import { FaSpinner } from "react-icons/fa"; // Ícone de loading
import {
  AppBody,
  Main,
  ContainerPrincipal,
  ContainerTitulo,
  ContainerInputs,
  Container,
  EmailIcone,
  PasswordIcone,
  Input,
  Form,
  Button,
  ContainerButton,
  ContainerTextBorda,
  PCadastreSe,
  LinkCadastreSe,
  H1,
} from "./styles"; 

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setIsLoading(true); // Ativa o loading

    try {
      const response = await axios.post("https://projeto-full-stack-apiariopro.onrender.com/usuarios/login", formData);

      login(response.data.usuario); 
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      localStorage.setItem("token", response.data.token);

      navigate("/home"); 
    } catch (error) {
      setErro(error.response?.data?.erro || "Erro ao fazer login!");
    } finally {
      setIsLoading(false); // Desativa o loading
    }
  };

  return (
    <AppBody>
      <Main>
        <ContainerPrincipal>
          <Form onSubmit={handleSubmit}>
            <ContainerTitulo>
              <H1>Apiário Pro</H1>
            </ContainerTitulo>
            <ContainerInputs>
              <Container>
                <EmailIcone />
                <Input
                  type="email"
                  placeholder="E-MAIL"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={40}
                />
              </Container>
              <Container>
                <PasswordIcone />
                <Input
                  type="password"
                  placeholder="SENHA"
                  required
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  maxLength={30}
                />
              </Container>
            </ContainerInputs>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            <ContainerButton>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <FaSpinner className="spinner" /> : "ENTRAR"}
              </Button>
            </ContainerButton>
            <ContainerTextBorda>
              <PCadastreSe>NÃO TEM CADASTRO?</PCadastreSe>
              <LinkCadastreSe onClick={() => navigate("/cadastro")}>
                Cadastre-se
              </LinkCadastreSe>
            </ContainerTextBorda>
          </Form>
        </ContainerPrincipal>
      </Main>
    </AppBody>
  );
}

export default Login;
