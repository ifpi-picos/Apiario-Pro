import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBody,
 
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
  ContainerCadastro,
  ContainerText,
  PLogin,
  LinkLogin,
  UserIcone,
 
} from './styles'; // Supondo que você tenha seus estilos em um arquivo separado

function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  
  return (
    <AppBody>
      
      
        <ContainerPrincipal>
        <ContainerCadastro>
        <Main>
            <Form>
            <ContainerTitulo>
               
          <H1>Apiário Pro</H1>
          
          </ContainerTitulo>
        
            <ContainerInputs>
            <Container>
                <UserIcone />
                <Input
                  type="text"
                  placeholder="NOME COMPLETO"
                  required
                  autoFocus
                  name="nome_usuario"
                  value={formData.nome_usuario}
                  onChange={handleChange}
                  maxLength={40}
                />
              </Container>
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
            <Container>
                <PasswordIcone />
                <Input
                  type="password"
                  placeholder="CONFIRME SUA SENHA"
                  required
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  maxLength={30}
                />
              </Container>
          </ContainerInputs>
           <ContainerText>
                <PLogin>JÁ POSSUI CADASTRO?</PLogin>
                <LinkLogin onClick={() => navigate("/login")}>Login!</LinkLogin>
              </ContainerText>
            </Form>
        
          <ContainerButton>
            <Button>Cadastrar</Button>
            
          </ContainerButton>
          </Main>
          </ContainerCadastro>
        </ContainerPrincipal>
      
      
    </AppBody>
  );
}

export default Cadastro;
