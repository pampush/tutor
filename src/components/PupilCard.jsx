import React from 'react';
import PropTypes from 'prop-types';

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

function PupilCard({ name, schedule, grade, parents, address, contacts }) {
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
        title={name}
        subheader={`Класс: ${grade}`}
      />
      <CardContent className="pupils__card-content">
        <Typography component="p">
          {Object.keys(schedule).map((key) => `${key}-${schedule[key]} `)}
        </Typography>
        <Typography component="p">{`Родители: ${parents}`}</Typography>
        <Typography component="p">{`Контакты: ${contacts}`}</Typography>
        <Typography component="p">{`Адрес: ${address}`}</Typography>
        <Box className="pupils__homework">
          <IconButton>
            <MenuBookIcon aria-label="homework" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

PupilCard.propTypes = {
  name: PropTypes.string.isRequired,
  schedule: PropTypes.object.isRequired,
  grade: PropTypes.string.isRequired,
  parents: PropTypes.arrayOf(PropTypes.string).isRequired,
  address: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PupilCard;
