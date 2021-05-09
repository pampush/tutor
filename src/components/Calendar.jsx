import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import format from 'date-fns/format';
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
    MuiPickersStaticWrapper: {
      staticWrapperRoot: {
        boxShadow:
          '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
        borderRadius: '4px',
      },
    },
  },
});

class RuLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, 'LLLL', { locale: this.locale });
  }

  getDatePickerHeaderText(date) {
    return format(date, 'dd MMMM', { locale: this.locale });
  }
}

function MuiCalendar({ handleClick }) {
  const dispatch = useDispatch();
  const date = useSelector(({ date }) => date.selected);

  const handleCellClick = (date) => {
    dispatch(setDate(date));
    handleClick(date);
  };

  return (
    <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
      <ThemeProvider theme={theme}>
        <DatePicker
          autoOk
          disableToolbar
          variant="static"
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
