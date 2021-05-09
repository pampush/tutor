import React from 'react';
import { fetchPrices } from '../redux/actions/finance';
import { formatISO } from 'date-fns';

import { Container } from '@material-ui/core';
import { MonthPicker } from '../components';

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

  const [date, setDate] = React.useState(new Date());
  const [prices, setPrices] = React.useState({});
  const [sum, setSum] = React.useState(0);

  React.useEffect(() => {
    let mounted = true;
    try {
      fetchPrices(formatISO(date, { representation: 'date' }).slice(0, -3)).then((prices) => {
        if (!mounted) return;

        setPrices(prices);

        if (Object.keys(prices).length) {
          setSum(
            Object.values(prices).reduce((accum, next) => ({ sum: accum.sum + next.sum })).sum,
          );
        }
      });
    } catch (e) {
      console.err(e);
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
      plugins: [
        {
          afterDraw: (chart) => {
            const ctx = chart.ctx;
            ctx.font = 'bold 48px sans-serif';
            ctx.textAlign = 'center';
            ctx.save();
            const imageSize = 200;
            ctx.fillText(
              sum || 'Уроков не найдено',
              chart.width / 2,
              (chart.height - chart.legend.height) / 2,
              imageSize,
            );
            ctx.restore();
          },
        },
      ],
    });
    return () => myChart.destroy();
  }, [sum]);

  return (
    <Container>
      <MonthPicker initialDate={date} handleDateChange={setDate} />
      {Object.keys(prices).length ? (
        <div className="finance__container">
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
