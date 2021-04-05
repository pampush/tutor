import React from 'react';
import { InfoPanel, Calendar, Lessons } from '../components';

import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function Schedule() {
  return (
    <Container maxWidth="xl">
      <Container maxWidth="md" className="info__container">
        <Grid container spacing={2}>
          <Hidden xsDown>
            <Grid item xs={4}>
              <InfoPanel />
            </Grid>
            <Grid item xs={4}>
              <InfoPanel />
            </Grid>
            <Grid item xs={4}>
              <InfoPanel />
            </Grid>
          </Hidden>
        </Grid>
      </Container>

      <Container maxWidth="xl" className="lessons__container">
        <Grid container spacing={2}>
          <Hidden only={['xs', 'sm']}>
            <Grid item xs={8}>
              <Lessons />
            </Grid>
          </Hidden>

          <Hidden mdUp>
            <Grid item xs={12}>
              <Lessons />
            </Grid>
          </Hidden>

          <Hidden smDown>
            <Grid item xs={4} className="calendar__container">
              <Box className="calendar--fixed">
                <Calendar />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Container>
  );
}

export default Schedule;
