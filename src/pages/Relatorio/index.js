import React, { useState } from 'react';
import Header from "../../components/HeaderPrincipal/index.js";

import {
    AppBody,
    Main,
    
  } from './styles';
const Producao = () => {
  // Estados para armazenar os dados de produção
  const [floradaData, setFloradaData] = useState({
    laranjeira: '',
    eucalipto: '',
    silvestre: '',
  });

  const [monthlyProduction, setMonthlyProduction] = useState(
    Array(12).fill('') // Um array com 12 posições para os meses do ano
  );

  // Função para lidar com mudanças nos campos de florada
  const handleFloradaChange = (e) => {
    const { name, value } = e.target;
    setFloradaData({ ...floradaData, [name]: value });
  };

  // Função para lidar com mudanças nos campos de produção mensal
  const handleMonthlyChange = (index, value) => {
    const updatedProduction = [...monthlyProduction];
    updatedProduction[index] = value;
    setMonthlyProduction(updatedProduction);
  };

  // Função para enviar os dados
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Florada Data:', floradaData);
    console.log('Monthly Production:', monthlyProduction);
  };

  return (
    <AppBody>
      <Header/>
      <Main>
    <div style={{ padding: '20px' }}>
      <h2>Cadastro de Produção de Mel</h2>

      {/* Formulário para entrada de dados por florada */}
      <form onSubmit={handleSubmit}>
        <h3>Produção por Tipo de Florada (kg)</h3>
        <div>
          <label>
            Florada de Laranjeira:
            <input
              type="number"
              name="laranjeira"
              value={floradaData.laranjeira}
              onChange={handleFloradaChange}
            />
          </label>
        </div>
        <div>
          <label>
            Florada de Eucalipto:
            <input
              type="number"
              name="eucalipto"
              value={floradaData.eucalipto}
              onChange={handleFloradaChange}
            />
          </label>
        </div>
        <div>
          <label>
            Florada Silvestre:
            <input
              type="number"
              name="silvestre"
              value={floradaData.silvestre}
              onChange={handleFloradaChange}
            />
          </label>
        </div>

        {/* Tabela para entrada de produção mensal */}
        <h3>Produção Mensal (kg)</h3>
        <table border="1" style={{ width: '100%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Mês</th>
              <th>Quantidade (kg)</th>
            </tr>
          </thead>
          <tbody>
            {[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ].map((month, index) => (
              <tr key={index}>
                <td>{month}</td>
                <td>
                  <input
                    type="number"
                    value={monthlyProduction[index]}
                    onChange={(e) => handleMonthlyChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px' }}>
          Salvar Dados
        </button>
      </form>
    </div>
    </Main>
    </AppBody>
  );
};

export default Producao;
