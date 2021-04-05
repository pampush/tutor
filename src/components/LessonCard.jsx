import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

function LessonCard({ time, theme, pupil }) {
  return (
    <Card className="lesson__container">
      {/* <Box className="info__svg-container">
      <CardMedia
        title="Contemplative Reptile"
        className="info__svg"
      />
    </Box> */}
      <CardContent>
        <Box>
          <Typography gutterBottom variant="h5" component="h2">
            {time}
          </Typography>
        </Box>
        <Typography variant="h6" color="textPrimary" component="p">
          {theme}
        </Typography>
        <Typography variant="caption" color="textPrimary" component="p">
          {pupil.name}, {pupil.address}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default LessonCard;
