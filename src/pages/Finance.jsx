import React from 'react';
import { makeStyles } from '@material-ui/styles';

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
} from 'chart.js';

const useStyles = makeStyles({
  container: {
    margin: '0 auto',
    maxHeight: '500px',
    maxWidth: '500px',
  },
});

Chart.register(
  LinearScale,
  Tooltip,
  BarElement,
  BarController,
  CategoryScale,
  PieController,
  ArcElement,
  Legend,
);

function Finance() {
  const canvas = React.useRef(null);
  const classes = useStyles();

  React.useEffect(() => {
    const myChart = new Chart(canvas.current, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'first',
            data: [12, 19, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],

            hoverOffset: 4,
          },
        ],
      },
    });
    return () => myChart.destroy();
  }, []);

  return (
    <div className={classes.container}>
      <canvas ref={canvas}></canvas>
    </div>
  );
}

export default Finance;
