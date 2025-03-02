import styled from "styled-components";
export const AppBody = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
background-color:#ffc400;
  height: 100vh;
`;
export const Header = styled.div`

`;

export const Main = styled.div`

`;
export const Imagem = styled.img`
display: flex;
max-width: 341px;


@media (max-width: 388px) {
  max-width: 308px;
}
@media (max-width: 359px) {
  max-width: 228px;
}

`;
export const ContainerPrincipal = styled.div`
display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
export const Container = styled.div`
display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
export const ContainerTitulo = styled.div`
display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
 
`;

export const H1 = styled.h1`
margin: 1em 0.2em 1px; 
color:black;  
`;
export const H2 = styled.h2`
font-size: 26px;
height:0;
font-weight: 600;
color:black; 

@media (max-width: 330px)
 {
  font-size: 18px;
}
`;
export const P1 = styled.p`

font-weight: 600;
font-size: 18px;
max-width: 39em;
color:black;
`;

export const Button = styled.button`
margin:5px;
border-radius:15px;
border:none;
height:38px;
width:100%;
font-weight: 700;
background-color:#3c3b3b; 
  color: #ffffff; 
  cursor:pointer;
   &:hover {
    opacity: 0.8;
  }
`;
export const ContainerButton = styled.div`
display: flex;

margin:10px;
width:280px;
`;
