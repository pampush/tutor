import React from 'react';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

import InfoPanelCard from './InfoPanelCard';

function InfoPanel() {
  return (
    <Container maxWidth="md" className="info__container">
      <Grid container spacing={2}>
        <Hidden xsDown>
          <Grid item>
            <InfoPanelCard />
          </Grid>
          <Grid item>
            <InfoPanelCard />
          </Grid>
          <Grid item>
            <InfoPanelCard />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
}

export default InfoPanel;
