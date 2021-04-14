import React from 'react';
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

import Calendar from './Calendar';
import LessonCard from './LessonCard';
import LessonTemplateCard from './LessonTemplateCard';
import AddLessonForm from './addLessonForm/AddLessonForm';
import SnackPopup from './SnackPopup';

function Lessons({ anchor, handleCalendarOpen, handleCalendarClose, handleCalendarClick }) {
  const lessons = useSelector(({ lessons }) => lessons.items);
  const lessonsLoaded = useSelector(({ lessons }) => lessons.isLoaded);

  const pupils = useSelector(({ pupils }) => pupils.items);
  const pupilsLoaded = useSelector(({ pupils }) => pupils.isLoaded);

  const scheduledLessons = useSelector(({ scheduledLessons }) => scheduledLessons.items);
  const scheduledLessonsLoaded = useSelector(({ scheduledLessons }) => scheduledLessons.isLoaded);

  const isLoaded = lessonsLoaded && pupilsLoaded && scheduledLessonsLoaded;

  const [viewAddLessonForm, setViewAddLessonForm] = React.useState(false);
  const [snackView, setSnackView] = React.useState(false);
  const [snackThemeView, setSnackThemeView] = React.useState(false);
  const [snackNotesView, setSnackNotesView] = React.useState(false);
  const calendar = React.useRef(null);

  React.useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setSnackView(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [snackView]);

  React.useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setSnackThemeView(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [snackThemeView]);

  React.useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setSnackNotesView(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [snackNotesView]);

  const handleAddLessonFormClick = () => setViewAddLessonForm(true);
  const handleCloseAddLessonForm = () => setViewAddLessonForm(false);

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
          <Menu
            id="simple-menu"
            anchorEl={anchor}
            keepMounted
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={Boolean(anchor)}
            onClose={handleCalendarClose}>
            <Calendar ref={calendar} handleClick={handleCalendarClick} />
          </Menu>
        </Hidden>
      </Box>

      {viewAddLessonForm && (
        <AddLessonForm
          open={viewAddLessonForm}
          handleClose={handleCloseAddLessonForm}
          handleSnack={setSnackView}
        />
      )}

      <SnackPopup open={snackView} message="Урок добавлен" />
      <SnackPopup open={snackThemeView} message="Тема изменена" />
      <SnackPopup open={snackNotesView} message="Заметка изменена" />

      <Container className="lessons__items-container">
        {isLoaded ? (
          <React.Fragment>
            {Object.entries(lessons).map(([key, value]) => (
              <LessonCard
                key={key}
                name={pupils[value.pupil].name}
                address={pupils[value.pupil].address}
                handleSnack={setSnackNotesView}
                {...value}
              />
            ))}
            {Object.entries(scheduledLessons).map(([key, value]) => {
              return (
                <LessonTemplateCard
                  key={key}
                  time={value.time}
                  scheduleId={value.id}
                  pupilId={pupils[value.pupil].id}
                  name={pupils[value.pupil].name}
                  subject={value.subject}
                  address={pupils[value.pupil].address}
                  handleSnack={setSnackThemeView}
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
