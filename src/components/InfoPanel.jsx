import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

function InfoPanel() {
  return (
    <Card className="info__card">
      <Box className="info__svg-container">
        <CardMedia
          component={CalendarTodayIcon}
          title="Contemplative Reptile"
          className="info__svg"
        />
      </Box>
      <CardContent className="info__content">
        <Typography gutterBottom variant="h5" component="h2" className="info__title">
          Понедельник
        </Typography>
        <Typography variant="body2" component="p" className="info__subtitle">
          02.05.2021
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoPanel;
