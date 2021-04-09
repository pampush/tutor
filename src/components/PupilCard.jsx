import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuBookIcon from '@material-ui/icons/MenuBook';

function PupilCard({ name, schedulesId, grade, parents, address, contacts, schedules }) {
  return (
    <Card className="pupils__card">
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
          {schedulesId.map((id) => `${schedules[id].day}-${schedules[id].time} `)}
        </Typography>
        <Typography component="p">{`Родители: ${parents}`}</Typography>
        <Typography component="p">{`Контакты: ${contacts.join(',')}`}</Typography>
        <Typography component="p">{`Адрес: ${address}`}</Typography>
      </CardContent>
      <CardActions className="pupils__homework">
        <IconButton>
          <MenuBookIcon aria-label="homework" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

PupilCard.propTypes = {
  name: PropTypes.string.isRequired,
  schedulesId: PropTypes.arrayOf(PropTypes.string).isRequired,
  schedules: PropTypes.object.isRequired,
  grade: PropTypes.number.isRequired,
  parents: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PupilCard;
