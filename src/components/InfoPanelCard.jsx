import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

function InfoPanelCard({ children, header, subheader }) {
  return (
    <Card className="info__card">
      <Box className="info__svg-container">{children}</Box>
      <CardContent className="info__content">
        <Typography gutterBottom variant="h5" component="h2" className="info__title">
          {header}
        </Typography>
        <Typography variant="body2" component="p" className="info__subtitle">
          {new Date().toISOString().slice(0, 10)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoPanelCard;
