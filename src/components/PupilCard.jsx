import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuBookIcon from '@material-ui/icons/MenuBook';

import { deleteLessonsByPupil, fetchLessons } from '../redux/actions/lessons';
import { deletePupilAction } from '../redux/actions/pupils';
import { deleteSchedulesByPupil, fetchSchedules } from '../redux/actions/schedules';
import { fetchScheduledLessons } from '../redux/actions/scheduledLessons';

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

function PupilCard({ id, name, schedulesId, grade, parents, address, contacts, schedules }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const date = useSelector(({ date }) => date.selected);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  async function handleDelete() {
    console.log(id);
    await Promise.all([
      dispatch(deleteLessonsByPupil(id)),
      dispatch(deletePupilAction(id)),
      dispatch(deleteSchedulesByPupil(id)),
    ]);
    dispatch(fetchLessons(date));
    dispatch(fetchSchedules({ preventIsLoaded: true }));
    dispatch(fetchScheduledLessons(date, { preventIsLoaded: true }));
  }

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
          <IconButton aria-label="Меню" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={`Класс: ${grade}`}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuList autoFocus={true} className="lesson__menu-container">
          <MenuItem onClick={handleClose}>Редактировать(disabled)</MenuItem>
          <MenuItem onClick={handleDelete}>Удалить</MenuItem>
        </MenuList>
      </Menu>

      <CardContent className="pupils__card-content">
        <Typography component="p">
          {schedulesId.map((id) => `${days[schedules[id].day - 1]}-${schedules[id].time} `)}
        </Typography>
        <Typography component="p">{`Родители: ${parents}`}</Typography>
        <Typography component="p">{`Контакты: ${contacts.join(',')}`}</Typography>
        <Typography component="p">{`Адрес: ${address}`}</Typography>
      </CardContent>
      <CardActions className="pupils__homework">
        <IconButton color="secondary" aria-label="Домашняя работа">
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