import React from 'react';
import {formatISO} from 'date-fns'

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

function InfoPanelCard({ children, header, date }) {
  return (
    <Card className="info__card">
      <Box className="info__svg-container">{children}</Box>
      <CardContent className="info__content">
        <Typography gutterBottom variant="h5" component="h2" className="info__title">
          {header}
        </Typography>
        <Typography variant="body2" component="p" className="info__subtitle">
          {formatISO(date, {representation: 'date'})}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoPanelCard;
