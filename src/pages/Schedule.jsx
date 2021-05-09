import React from 'react';
import { Calendar, Lessons, Instruction } from '../components';
import { useDispatch } from 'react-redux';

import { fetchLessons } from '../redux/actions/lessons';
import { fetchScheduledLessons } from '../redux/actions/scheduledLessons';
import { AuthContext } from '../contexts/AuthContext';

import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


function Schedule() {
  const dispatch = useDispatch();
  const [anchorCalendar, setAnchorEl] = React.useState(null);
  const { firstLogin, setFirstLogin } = React.useContext(AuthContext);
  
  function handleCalendarOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleCalendarClose() {
    setAnchorEl(null);
  }

  function handleCalendarClick(date) {
    dispatch(fetchLessons(date));
    dispatch(fetchScheduledLessons(date));
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      {firstLogin && <Instruction open={firstLogin} handleClose={setFirstLogin} />}
      <Container maxWidth="xl" className="lessons__container">
        <Grid container spacing={2}>
          <Hidden only={['xs', 'sm']}>
            <Grid item xs={8}>
              <Lessons
                anchor={anchorCalendar}
                handleClick={handleCalendarOpen}
                handleClose={handleCalendarClose}
                handleCalendarClick={handleCalendarClick}
              />
            </Grid>
          </Hidden>

          <Hidden mdUp>
            <Grid item xs={12}>
              <Lessons
                anchor={anchorCalendar}
                handleCalendarOpen={handleCalendarOpen}
                handleCalendarClose={handleCalendarClose}
                handleCalendarClick={handleCalendarClick}
              />
            </Grid>
          </Hidden>

          <Hidden smDown>
            <Grid item xs={4} className="calendar__container">
              <Box className="calendar--fixed">
                <Calendar handleClick={handleCalendarClick} />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Schedule;
