import React from 'react';
import { Box } from '@material-ui/core';
import { Line, Bar } from 'react-chartjs-2';

const ChartBlock = ({ chartType }) => {
  const data = {
    labels: [
      '1', '2', '3', '4',
      '5', '6', '7', '8',
      '9', '10', '11', '12',
      '13', '14', '15', '16',
      '17', '18', '19', '20',
      '21', '22', '23', '24',
      '25', '26', '27', '28'
    ],
    datasets: [
      {
        data: [
          2100, 1800, 2000, 1600,
          4200, 0, 1800, 1000,
          500, 700, 800, 1200,
          1800, 2100, 2400, 3000,
          2000, 2200, 1900, 2100,
          1700, 3500, 2000, 2800,
          3500, 3300, 3800, 3200,
        ],
        fill: false,
        backgroundColor: '#ff7133',
        borderColor: '#ff7133',
        tension: 0.05,
      },
      {
        data: [
          1100, 1400, 2100, 600,
          3300, 800, 1200, 400,
          600, 600, 700, 600,
          800, 1100, 1420, 3100,
          3000, 1200, 2900, 1100,
          1700, 1500, 2500, 1800,
          2500, 2300, 1800, 3300,
        ],
        fill: false,
        backgroundColor: '#9ec5ec',
        borderColor: '#9ec5ec',
        tension: 0.05,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            labelOffset: 12,
            beginAtZero: true,
            padding: 5,
            mirror: chartType === 'line',
            callback: (value) => {
              if(value%1000 === 0) return `$${value/1000}${value !== 0 ? 'K' : ''}`;
            },
            max: 5000,
          },
          gridLines: {
            drawBorder: false,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            drawOnChartArea: false,
          },
          offset: true,
        },
      ],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 5,
      },
    },
    grouped: false,
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <Box width='100%' height='350px' className='chart-wrapper'>
      {chartType === 'line' && (
        <Line
          data={data}
          options={options}
          height='100%'
          width='100%'
        />
      )}

      {chartType === 'bar' && (
        <Bar
          data={data}
          options={options}
          height='100%'
          width='100%'
        />
      )}
    </Box>
  );
};

export default ChartBlock;
