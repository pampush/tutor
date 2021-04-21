import React from 'react';
import { fetchPrices } from '../redux/actions/finance';
import { Container, TextField } from '@material-ui/core';

import {
  Chart,
  BarElement,
  LinearScale,
  BarController,
  CategoryScale,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
} from 'chart.js';

Chart.register(
  LinearScale,
  Tooltip,
  BarElement,
  BarController,
  CategoryScale,
  PieController,
  ArcElement,
  Legend,
  DoughnutController,
);

function colorGen() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function Finance() {
  const canvas = React.useRef(null);

  const [date, setDate] = React.useState(
    `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}`,
  );

  const [prices, setPrices] = React.useState({});

  React.useEffect(() => {
    let mounted = true;

    try {
      fetchPrices(date).then((prices) => mounted && setPrices(prices));
    } catch (e) {
      console.log(e);
    }

    return () => {
      mounted = false;
    };
  }, [date]);

  React.useEffect(() => {
    if (Object.keys(prices).length === 0) return;

    const myChart = new Chart(canvas.current, {
      type: 'doughnut',
      data: {
        labels: Object.values(prices).map(({ name }) => name),
        datasets: [
          {
            label: 'first',
            data: Object.values(prices).map(({ sum }) => sum),
            backgroundColor: Object.keys(prices).map(() => colorGen()),

            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
    return () => myChart.destroy();
  }, [prices]);

  return (
    <Container>
      <TextField
        value={date}
        onChange={(e) => setDate(e.target.value)}
        margin="normal"
        name="month"
        label="Месяц"
        type="month"
        autoComplete="off"
      />
      {Object.keys(prices).length ? (
        <div className="finance__container">
          <span className="finance__center">
            {Object.values(prices).reduce((accum, next) => ({ sum: accum.sum + next.sum })).sum ||
              'Уроков не найдено'}
          </span>
          <canvas ref={canvas}></canvas>
        </div>
      ) : (
        <div className="finance__container">
          <span>Учеников не найдено</span>
        </div>
      )}
    </Container>
  );
}

export default Finance;
