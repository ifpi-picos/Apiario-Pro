import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
      
      <Main>
        <ContainerPrincipal>
            
            <Form>
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
          <ContainerButton>
            <Button>ENTRAR</Button>
            
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
