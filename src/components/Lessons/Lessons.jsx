import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import Skeleton from '@material-ui/lab/Skeleton';
import Container from '@material-ui/core/Container';

import Calendar from '../Calendar';
import LessonCard from './LessonCard';
import LessonTemplateCard from './LessonTemplateCard';
import AddLessonForm from '../addLessonForm/AddLessonForm';
import SnackPopup from '../SnackPopup';
import { Popover } from '@material-ui/core';

function Lessons({ anchor, handleCalendarOpen, handleCalendarClose, handleCalendarClick }) {
  const lessons = useSelector(({ lessons }) => lessons.items);
  const lessonsLoaded = useSelector(({ lessons }) => lessons.isLoaded);

  const pupils = useSelector(({ pupils }) => pupils.items);
  const pupilsLoaded = useSelector(({ pupils }) => pupils.isLoaded);

  const scheduledLessons = useSelector(({ scheduledLessons }) => scheduledLessons.items);
  const scheduledLessonsLoaded = useSelector(({ scheduledLessons }) => scheduledLessons.isLoaded);

  const userStorage = useSelector(({ user }) => user.bucketId);

  const isLoaded = lessonsLoaded && pupilsLoaded && scheduledLessonsLoaded;

  const [viewAddLessonForm, setViewAddLessonForm] = React.useState(false);
  const [snackAddLessonView, setSnackAddLessonView] = React.useState(false);
  const [snackFromTemplateView, setSnackFromTemplateView] = React.useState(false);
  const [snackNotesView, setSnackNotesView] = React.useState(false);
  const [snackDeleteLesson, setSnackDeleteLesson] = React.useState(false);
  const [snackDeleteSchedule, setSnackDeleteSchedule] = React.useState(false);
  const [snackLessonThemeEdit, setSnackLessonThemeEdit] = React.useState(false);
  const [snackLessonEdit, setSnackLessonEdit] = React.useState(false);

  const calendar = React.useRef(null);

  const handleAddLessonFormClick = () => setViewAddLessonForm(true);
  const handleCloseAddLessonForm = () => setViewAddLessonForm(false);

  const handleSnackAddLessonView = React.useCallback(() => setSnackAddLessonView(false), []);
  const handleSnackFromTempalateView = React.useCallback(() => setSnackFromTemplateView(false), []);
  const handleSnackNotesView = React.useCallback(() => setSnackNotesView(false), []);
  const handleSnackDeleteLesson = React.useCallback(() => setSnackDeleteLesson(false), []);
  const handleSnackDeleteSchedule = React.useCallback(() => setSnackDeleteSchedule(false), []);
  const handleSnackLessonThemeEdit = React.useCallback(() => setSnackLessonThemeEdit(false), []);
  const handleSnackLessonEdit = React.useCallback(() => setSnackLessonEdit(false), []);

  return (
    <div>
      <Typography variant="h5" className="lessons__header">
        Уроки
      </Typography>

      <Box className="lessons__buttons-container">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          className="lessons__button-text"
          onClick={handleAddLessonFormClick}>
          Новый урок
        </Button>
        <Hidden mdUp>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCalendarOpen}
            startIcon={<CalendarTodayIcon />}
            className="lessons__button-text">
            Выбрать день
          </Button>
          <Popover
            id="simple-menu"
            anchorEl={anchor}
            keepMounted
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={Boolean(anchor)}
            onClose={handleCalendarClose}>
            <Calendar ref={calendar} handleClick={handleCalendarClick} />
          </Popover>
        </Hidden>
      </Box>

      <AddLessonForm
        open={viewAddLessonForm}
        handleClose={handleCloseAddLessonForm}
        handleSnack={setSnackAddLessonView}
      />

      <SnackPopup
        open={snackAddLessonView}
        message="Урок добавлен"
        onClose={handleSnackAddLessonView}
      />
      <SnackPopup
        open={snackFromTemplateView}
        message="Урок из шаблона добавлен"
        onClose={handleSnackFromTempalateView}
      />
      <SnackPopup open={snackNotesView} message="Заметка изменена" onClose={handleSnackNotesView} />
      <SnackPopup
        open={snackDeleteLesson}
        message="Урок удален"
        onClose={handleSnackDeleteLesson}
      />
      <SnackPopup
        open={snackDeleteSchedule}
        message="Шаблон удален"
        onClose={handleSnackDeleteSchedule}
      />
      <SnackPopup
        open={snackLessonThemeEdit}
        message="Тема изменена"
        onClose={handleSnackLessonThemeEdit}
      />
      <SnackPopup
        open={snackLessonEdit}
        message="Внеплановый урок изменен"
        onClose={handleSnackLessonEdit}
      />

      <Container className="lessons__items-container">
        {isLoaded ? (
          <React.Fragment>
            {Object.entries(lessons).map(([key, value]) => (
              <LessonCard
                key={key}
                name={pupils[value.pupil].name}
                address={pupils[value.pupil].address}
                userStorage={userStorage}
                handleSnack={setSnackNotesView}
                handleDeleteSnack={setSnackDeleteLesson}
                handleLessonThemeEditSnack={setSnackLessonThemeEdit}
                handleSnackLessonEdit={setSnackLessonEdit}
                {...value}
              />
            ))}
            {Object.entries(scheduledLessons).map(([key, value]) => {
              return (
                <LessonTemplateCard
                  key={key}
                  pupilId={pupils[value.pupil].id}
                  name={pupils[value.pupil].name}
                  address={pupils[value.pupil].address}
                  handleCreateSnack={setSnackFromTemplateView}
                  handleDeleteSnack={setSnackDeleteSchedule}
                  {...value}
                />
              );
            })}
            {!(Object.keys(lessons).length || Object.keys(scheduledLessons).length) ? (
              <Typography>На текущий день уроков не запланировано</Typography>
            ) : null}
          </React.Fragment>
        ) : (
          Array(4)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} variant="rect" className="lessons__skeleton" />
            ))
        )}
      </Container>
    </div>
  );
}

export default Lessons;
