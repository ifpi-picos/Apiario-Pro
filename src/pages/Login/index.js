import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext"; // Importando o contexto
import {
  AppBody,
  Header,
  H2,
  H1,
  Main,
  P1,
  ContainerInputs,
  Container,
  EmailIcone,
  PasswordIcone,
  Input,
  Form,
  Button,
  ContainerButton,
  ContainerTitulo,
  ContainerPrincipal,
  ContainerTextBorda,
  PCadastreSe,
  LinkCadastreSe,
} from './styles'; // Supondo que você tenha seus estilos em um arquivo separado

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtendo a função login do contexto para atualizar o nome
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [erro, setErro] = useState(""); // Estado para exibir erros

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(""); // Reseta o erro antes da tentativa

    try {
      const response = await axios.post("https://projeto-full-stack-apiariopro.onrender.com/usuarios/login", formData);
      console.log("Usuário logado:", response.data);

      // Atualizando o nome do usuário no contexto e localStorage
      login(response.data.usuario); // Atualiza o nome do usuário no contexto global
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      localStorage.setItem("token", response.data.token);

      navigate("/home"); // Redireciona para outra página após o login
    } catch (error) {
      setErro(error.response?.data?.erro || "Erro ao fazer login!");
    }
  };

  return (
    <AppBody>
      <Main>
        <ContainerPrincipal>
          <Form onSubmit={handleSubmit}> {/* Adicionando onSubmit no formulário */}
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
            {erro && <p style={{ color: "red" }}>{erro}</p>} {/* Exibe erro, se houver */}
            <ContainerButton>
              <Button type="submit">ENTRAR</Button>
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
