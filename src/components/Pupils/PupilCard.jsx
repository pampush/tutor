import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
import { Dialog, DialogContent, DialogTitle, Box, Button, Tooltip } from '@material-ui/core';

import { deleteLessonsBySmth, fetchLessons } from '../../redux/actions/lessons';
import { deletePupilAction } from '../../redux/actions/pupils';
import { deleteSchedulesByPupil, fetchSchedules } from '../../redux/actions/schedules';
import { fetchScheduledLessons } from '../../redux/actions/scheduledLessons';
import AddScheduleForm from '../addScheduleForm/AddScheduleForm';
import EditPupilForm from '../editPupilForm/EditPupilForm';

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

function PupilCard({
  id,
  name,
  schedulesId,
  grade,
  parents = [],
  address = '',
  schedules,
  storage,
  handleSnack,
  handleViewEditPupilSnack,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [viewAddScheduleForm, setViewAddScheduleForm] = React.useState(false);
  const [viewDeleteConsentDialog, setViewDeleteConsentDialog] = React.useState(false);
  const [viewEditPupilForm, setViewEditPupilForm] = React.useState(false);
  const date = useSelector(({ date }) => date.selected);

  const forParentsMemo = React.useRef([]);
  const parentsMemo = parents.length ? parents : forParentsMemo.current;

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleCloseEditPupilForm = React.useCallback(() => setViewEditPupilForm(false), []);

  async function handleDelete() {
    await Promise.all([
      dispatch(deleteLessonsBySmth({ field: 'pupil', id })),
      dispatch(deletePupilAction(id)),
      dispatch(deleteSchedulesByPupil(id)),
    ]);
    dispatch(fetchLessons(date));
    dispatch(fetchSchedules({ preventIsLoaded: true }));
    dispatch(fetchScheduledLessons(date, { preventIsLoaded: true }));
  }

  function handleHomework() {
    history.push(`/homework/${storage}/${id}`);
  }

  return (
    <React.Fragment>
      <AddScheduleForm
        open={viewAddScheduleForm}
        handleSnack={handleSnack}
        handleClose={() => {
          setViewAddScheduleForm(false);
        }}
        id={id}
      />

      <EditPupilForm
        open={viewEditPupilForm}
        handleClose={handleCloseEditPupilForm}
        handleSnack={handleViewEditPupilSnack}
        id={id}
        name={name}
        grade={grade}
        parents={parentsMemo}
        address={address}
      />

      <Dialog
        open={viewDeleteConsentDialog}
        onClose={() => setViewDeleteConsentDialog(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="sm">
        <DialogTitle>
          Удаление ученика приведет к удалению всех его уроков и шаблонов. Вы уверены?
        </DialogTitle>
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
              onClick={handleDelete}>
              Подтвердить
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Card className="pupils__card">
        <CardHeader
          className="pupils__card-header"
          avatar={
            <Avatar aria-label="Ученик" className="pupils__card-avatar">
              {name[0]}
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
            <MenuItem onClick={() => setViewAddScheduleForm(true)}>
              Добавить пункт расписания
            </MenuItem>
            <MenuItem onClick={() => setViewEditPupilForm(true)}>Редактировать</MenuItem>
            <MenuItem onClick={() => setViewDeleteConsentDialog(true)}>Удалить</MenuItem>
          </MenuList>
        </Menu>

        <CardContent className="pupils__card-content">
          <Typography component="p">
            {schedulesId.map((id) => `${days[schedules[id].day - 1]}-${schedules[id].time} `)}
          </Typography>
          {parents.map((parent, i) => (
            <Typography component="p" key={i}>
              {parent.person}: {parent.contact}
            </Typography>
          ))}
          <Typography component="p">{address && `Адрес: ${address}`}</Typography>
        </CardContent>
        <CardActions className="pupils__homework">
          <Tooltip title="Домашняя работа" aria-label="Домашняя работа" arrow>
            <IconButton color="secondary" aria-label="Домашняя работа" onClick={handleHomework}>
              <MenuBookIcon aria-label="homework" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

PupilCard.propTypes = {
  name: PropTypes.string.isRequired,
  schedulesId: PropTypes.arrayOf(PropTypes.string).isRequired,
  schedules: PropTypes.object.isRequired,
  grade: PropTypes.number.isRequired,
  parents: PropTypes.PropTypes.arrayOf(PropTypes.object),
  address: PropTypes.string,
};

export default PupilCard;
