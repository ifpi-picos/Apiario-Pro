import styled from "styled-components";
export const AppBody = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  height: 100vh;
`;
export const Header = styled.div`
margin:2em;
`;
export const Nav= styled.div`

display: flex;
justify-content: space-between;
align-items:center;
  
`;
export const Main = styled.div`

`;
export const ContainerPrincipal = styled.div`
display: flex;
    width: 100%;
    flex-direction: column;
`;
export const ContainerClima = styled.div`
width: 100%;
text-align: center;
`;
export const H1 = styled.h1`
margin: 1em 0.2em 1px;   
`;
export const H2 = styled.h2`
font-size: 26px;
font-weight: 600;

@media (max-width: 330px)
 {
  font-size: 18px;
}
`;
export const Footer = styled.footer`
  background-color: #ffffff;
  padding: 10px 0;
 
`;
export const Form = styled.form`
    display: flex;
    align-items: center;
    
  `;
  
  export const Input = styled.input`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
  `;
  export const Ul = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
  `;
  
  export const Li = styled.li`
    cursor: pointer;
    padding: 8px;
  `;
  

export const ContainerForm= styled.div`
display:column;
margin-left:auto;

`;
export const Button = styled.button`
  
`;
export const WeatherInfo = styled.div`
 
`;
export const Icon = styled.img`
 
`;