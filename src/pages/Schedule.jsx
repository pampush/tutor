import React from 'react';
import { InfoPanel, Calendar, Lessons } from '../components';

import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function Schedule() {
  return (
    <Container maxWidth="xl">
      <Container maxWidth="md" className="info__container">
        <Grid container spacing={2}>
          <Hidden xsDown>
            <Grid item>
              <InfoPanel />
            </Grid>
            <Grid item>
              <InfoPanel />
            </Grid>
            <Grid item>
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
