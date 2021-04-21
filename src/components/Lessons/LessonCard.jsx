import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import NotesForm from '../notesForm/NotesForm';
import { deleteLesson } from '../../redux/actions/lessons';
import { deleteLessonFromSchedule } from '../../redux/actions/schedules';
import { fetchScheduledLessons } from '../../redux/actions/scheduledLessons';

function LessonCard({
  id,
  time,
  theme,
  date,
  name,
  price,
  address,
  subject,
  note,
  schedule,
  handleSnack,
  handleDeleteSnack,
}) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [viewNotesForm, setViewNotesForm] = React.useState(false);
  const selectedDate = useSelector(({ date }) => date.selected);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  /**
   * How does dispatch actually work?
   * Am I supposed to chain dispatches to make sure async requests queuing in sequence?
   */
  function handleDelete() {
    dispatch(deleteLesson(id));
    handleDeleteSnack(true);
    if (schedule) dispatch(deleteLessonFromSchedule({ id: schedule, date }));
    dispatch(fetchScheduledLessons(selectedDate));
  }

  const clickNotesForm = () => setViewNotesForm(true);
  const closeNotesForm = () => setViewNotesForm(false);


  return (
    <React.Fragment>
      <NotesForm
        open={viewNotesForm}
        handleSnack={handleSnack}
        note={note}
        id={id}
        handleClose={closeNotesForm}
      />

      <Card className="lesson__container">
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
            <MenuItem onClick={handleClose}>Домашняя работа(disabled)</MenuItem>
            <MenuItem onClick={clickNotesForm}>Заметки</MenuItem>
            <MenuItem onClick={handleClose}>push(disabled)</MenuItem>
            <MenuItem onClick={handleClose}>Редактировать(disabled)</MenuItem>
            <MenuItem onClick={handleDelete}>Удалить</MenuItem>
          </MenuList>
        </Menu>
        <CardContent>
          <Box className="lesson__header">
            <Typography gutterBottom variant="h5" className="lesson__header-text">
              {time} {subject}
            </Typography>
            <IconButton aria-label="menu" className="lesson__header-more" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Typography variant="h5" color="textPrimary" className="lesson__theme" component="p">
            {theme}
          </Typography>
          <Typography variant="subtitle2" color="textPrimary" component="p">
            {name}, {address}, {`стоимость: ${price}`}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

LessonCard.propTypes = {
  time: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default LessonCard;
