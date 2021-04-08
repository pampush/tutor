import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
  overrides: {
    MuiPickersDay: {
      daySelected: {
        backgroundColor: orange[500],
        '&:hover': {
          backgroundColor: orange[500],
        },
      },
      current: {
        color: orange[500],
      },
    },
  },
});

function MuiCalendar({ handleClick }) {
  const [date, changeDate] = React.useState(new Date());

  const handleCellClick = (date) => {
    changeDate(date);
    handleClick(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <ThemeProvider theme={theme}>
        <DatePicker
          autoOk
          disableToolbar
          variant="static"
          openTo="date"
          value={date}
          onChange={handleCellClick}
        />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

const Calendar = React.forwardRef((props, ref) => {
  return (
    <MuiCalendar useRef={ref} {...props}>
      {props.children}
    </MuiCalendar>
  );
});

export default Calendar;
