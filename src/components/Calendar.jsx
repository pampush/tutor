import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  toolbar: {
    color: 'red',
  },
});

function Calendar() {
  const classes = useStyles();
  const [date, changeDate] = React.useState(new Date());
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <DatePicker
        autoOk
        disableToolbar
        // orientation="landscape"
        variant="static"
        openTo="date"
        value={date}
        onChange={changeDate}
        className={classes.toolbar}
      />
    </MuiPickersUtilsProvider>
  );
}

export default Calendar;
