import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import Header from "../../components/HeaderPrincipal/index.js";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,

} from 'chart.js';
import {
  AppBody,
  Main,
  DivGraf,
  
} from './styles';
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Gestao = () => {
  // Dados do gráfico de pizza
  const pieData = {
    labels: ['Florada do Marmeleiro', 'Florada de Angico', 'Florada Silvestre'],
    datasets: [
      {
        label: 'Produção por Tipo de Florada',
        data: [40, 35, 25], // Percentuais de produção
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Dados do gráfico de histograma
  const barData = {
    labels: [
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
    ],
    datasets: [
      {
        label: 'Produção de Mel (kg)',
        data: [50, 60, 0, 80, 0, 100, 95, 85, 70, 60, 0, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Produção de Mel por Mês',
      },
    },
  };

  return (
    <AppBody>
      <Header/>
      <Main>
    <div style={{ padding: '20px' }}>
      <h2> Gestão de Produção de Mel - Análise de Gráficos</h2>
    <DivGraf>
      <div style={{ width: '25%', marginLeft: '60px',marginTop:'30px'  }}>
        <h3>Produção por Tipo de Florada</h3>
        <Pie data={pieData} />
      </div>

      <div style={{ width: '50%', marginLeft: '60px', marginTop:'30px'}}>
        <h3>Produção Mensal de Mel</h3>
        <Bar data={barData} options={barOptions} />
      </div>
      </DivGraf>
    </div>
    
    </Main>
    </AppBody>
  );
};

export default Gestao;
