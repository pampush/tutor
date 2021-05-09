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
import { Dialog, DialogTitle, DialogContent, Button } from '@material-ui/core';

import LessonFromTemplateForm from '../lessonFromTemplateForm/LessonFromTemplateForm';
import EditScheduleForm from '../editScheduleForm/EditScheduleForm';
import { deleteScheduleAction } from '../../redux/actions/schedules';
import { fetchLessons, deleteLessonsBySmth } from '../../redux/actions/lessons';
import { fetchScheduledLessons } from '../../redux/actions/scheduledLessons';
import { pullScheduleFromPupil } from '../../redux/actions/pupils';

function LessonTemplateCard({
  time,
  pupil,
  id,
  subject,
  name,
  day,
  address,
  price = 0,
  handleCreateSnack,
  handleDeleteSnack,
}) {
  const dispatch = useDispatch();
  const date = useSelector(({ date }) => date.selected);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [viewDeleteConsentDialog, setViewDeleteConsentDialog] = React.useState(false);
  const [viewForm, setViewForm] = React.useState(false);
  const [viewEditScheduleForm, setViewEditScheduleForm] = React.useState(false);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCloseForm = () => setViewForm(false);
  const handleOpenForm = () => setViewForm(true);

  const handleCloseEditScheduleForm = () => setViewEditScheduleForm(false);

  async function handleDeleteSchedule() {
    await Promise.all([
      dispatch(deleteLessonsBySmth({ field: 'schedule', id })),
      dispatch(deleteScheduleAction(id)),
      dispatch(pullScheduleFromPupil(pupil, id)),
    ]);
    handleDeleteSnack(true);
    dispatch(fetchLessons(date));
    dispatch(fetchScheduledLessons(date));
  }

  return (
    <React.Fragment>
      <LessonFromTemplateForm
        open={viewForm}
        pupilId={pupil}
        scheduleId={id}
        handleClose={handleCloseForm}
        handleSnack={handleCreateSnack}
      />
      <EditScheduleForm
        open={viewEditScheduleForm}
        handleClose={handleCloseEditScheduleForm}
        id={id}
        time={time}
        subject={subject}
        day={day}
        price={price}
      />

      <Dialog
        open={viewDeleteConsentDialog}
        onClose={() => setViewDeleteConsentDialog(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="sm">
        <DialogTitle>Удаление шаблона приведет к удалению всех его уроков. Вы уверены?</DialogTitle>
        <DialogContent className="lesson-form__dialog-content">
          <Box className="lesson-form__controls">
            <Button
              variant="contained"
              color="secondary"
              style={{ fontWeight: '600' }}
              onClick={() => setViewDeleteConsentDialog(false)}>
              Закрыть
            </Button>
            <Button
              variant="contained"
              style={{ fontWeight: '600', backgroundColor: 'red' }}
              onClick={handleDeleteSchedule}>
              Подтвердить
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Card className="lesson__container lesson__container--template">
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
            <MenuItem onClick={handleOpenForm}>Добавить урок из шаблона</MenuItem>
            <MenuItem onClick={() => setViewEditScheduleForm(true)}>Редактировать шаблон</MenuItem>
            <MenuItem onClick={() => setViewDeleteConsentDialog(true)}>
              Удалить этот шаблон с уроками
            </MenuItem>
          </MenuList>
        </Menu>
        <CardContent>
          <Box className="lesson__header">
            <Typography gutterBottom variant="h5" className="lesson__header-text">
              {time} {subject} (шаблон урока)
            </Typography>
            <IconButton aria-label="Меню" className="lesson__header-more" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Typography variant="h5" color="textPrimary" className="lesson__theme" component="p">
            Введите тему урока, открыв меню справа
          </Typography>
          <Typography variant="subtitle2" color="textPrimary" component="p">
            {name}, {address}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

LessonTemplateCard.propTypes = {
  time: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  address: PropTypes.string,
  pupil: PropTypes.string.isRequired,
};

export default LessonTemplateCard;
