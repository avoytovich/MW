import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Line, Bar } from 'react-chartjs-2';

const ChartBlock = ({ chartType }) => {
  const data = {
    labels: [
    ],
    datasets: [
      {
        data: [],
        fill: false,
        backgroundColor: '#ff7133',
        borderColor: '#ff7133',
        tension: 0.05,
      },
      {
        data: [],
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
            // eslint-disable-next-line
            callback: (value) => {
              if (value % 1000 === 0) return `$${value / 1000}${value !== 0 ? 'K' : ''}`;
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
          height={100}
          width={100}
        />
      )}

      {chartType === 'bar' && (
        <Bar
          data={data}
          options={options}
          height={100}
          width={100}
        />
      )}
    </Box>
  );
};

ChartBlock.propTypes = {
  chartType: PropTypes.string,
};

export default ChartBlock;
