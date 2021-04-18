import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';

import { setDate } from '../redux/actions/date';

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
  const dispatch = useDispatch();
  const date = useSelector(({ date }) => date.selected);

  const handleCellClick = (date) => {
    dispatch(setDate(date));
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