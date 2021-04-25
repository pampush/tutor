import { addMonths } from 'date-fns';
import { makeStyles } from '@material-ui/styles';

import { Grid, Typography, IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const useStyles = makeStyles({
  root: {
    marginTop: '20px',
  },
});

function MonthPicker({ initialDate, handleDateChange }) {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item>
        <IconButton onClick={() => handleDateChange(addMonths(initialDate, -1))}>
          <NavigateBeforeIcon />
        </IconButton>
      </Grid>
      <Grid item align="center">
        <Typography>{`${months[initialDate.getMonth()]} ${initialDate.getFullYear()}`}</Typography>
      </Grid>
      <Grid item>
        <IconButton onClick={() => handleDateChange(addMonths(initialDate, 1))}>
          <NavigateNextIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default MonthPicker;
