import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';

import PupilCard from './PupilCard';

let lesson = {
  time: '15:00',
  theme: 'Дробно-рациональные выражения',
  pupil: '1',
};

const pupils = {
  1: {
    name: 'Алеся Петрова',
    address: 'Калинина 12, 4 этаж, кв 40',
    grade: '10',
    parents: ['мама'],
    contacts: ['+79999999999'],
    schedule: {
      mon: '15:00',
      thu: '15:00',
    },
  },
};

function PupilsList({ anchor, handleClick }) {
  return (
    <div>
      <Typography variant="h5" className="pupils__header">
        Ученики
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        className="pupils__button-text"
        onClick={handleClick}>
        Новый ученик
      </Button>
      <Grid container spacing={2} className="pupils__card-container">
        <Grid item md={4} sm={6} xs={12}>
          <PupilCard pupil={pupils[1]} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <PupilCard pupil={pupils[1]} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <PupilCard pupil={pupils[1]} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <PupilCard pupil={pupils[1]} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <PupilCard pupil={pupils[1]} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <PupilCard pupil={pupils[1]} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <PupilCard pupil={pupils[1]} />
        </Grid>
      </Grid>
    </div>
  );
}

export default PupilsList;
