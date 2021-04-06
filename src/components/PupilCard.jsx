import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuBookIcon from '@material-ui/icons/MenuBook';

function PupilCard({ pupil }) {
  return (
    <Card>
      <CardHeader
        className="pupils__card-header"
        avatar={
          <Avatar aria-label="pupil" className="pupils__card-avatar">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={pupil.name}
        subheader={`Класс: ${pupil.grade}`}
      />
      <CardContent className="pupils__card-content">
        <Typography component="p">
          {Object.keys(pupil.schedule).map((key) => `${key}-${pupil.schedule[key]} `)}
        </Typography>
        <Typography component="p">{`Родители: ${pupil.parents}`}</Typography>
        <Typography component="p">{`Контакты: ${pupil.contacts}`}</Typography>
        <Typography component="p">{`Адрес: ${pupil.address}`}</Typography>
        <Box className="pupils__homework">
          <IconButton>
            <MenuBookIcon aria-label="homework" onClick />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PupilCard;
