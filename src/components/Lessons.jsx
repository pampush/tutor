import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import Skeleton from '@material-ui/lab/Skeleton';

import Calendar from './Calendar';
import LessonCard from './LessonCard';
import { Container } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';

function Lessons({ anchor, handleCalendarOpen, handleCalendarClose, handleCalendarClick }) {
  const dispatch = useDispatch();
  const lessons = useSelector(({ lessons }) => lessons.items);
  const lessonsLoaded = useSelector(({ lessons }) => lessons.isLoaded);
  const pupils = useSelector(({ pupils }) => pupils.items);
  const pupilsLoaded = useSelector(({ pupils }) => pupils.isLoaded);
  const schedules = useSelector(({ schedules }) => schedules.items);
  const schedulesLoaded = useSelector(({ schedules }) => schedules.isLoaded);

  const isLoaded = lessonsLoaded && pupilsLoaded && schedulesLoaded;
  const calendar = React.useRef(null);

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
          className="lessons__button-text">
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

      <Container className="lessons__items-container">
        {isLoaded
          ? Object.keys(lessons).map((key) => (
              <LessonCard
                key={key}
                time={schedules[lessons[key].schedule].time}
                theme={lessons[key].theme}
                name={pupils[lessons[key].pupil].name}
                address={pupils[lessons[key].pupil].address}
              />
            ))
          : Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} variant="rect" className="lessons__skeleton" />
              ))}
      </Container>
    </div>
  );
}

export default Lessons;
