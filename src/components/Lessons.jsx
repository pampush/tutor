import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';

import Calendar from './Calendar';
import LessonCard from './LessonCard';
import { Container } from '@material-ui/core';

let lesson = {
  time: '15:00',
  theme: 'Дробно-рациональные выражения',
  pupil: '1',
};

const pupils = {
  1: {
    name: 'Алеся Петрова',
    address: 'Калинина 12, 4 этаж, кв 40',
    grade: '10',
    parents: ['мама'],
    contacts: ['+79999999999'],
  },
};

lesson = { ...lesson, pupil: pupils[lesson.pupil] };

function Lessons({ anchor, handleClick, handleClose }) {
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
            onClick={handleClick}
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
            onClose={handleClose}>
            <Calendar />
          </Menu>
        </Hidden>
      </Box>

      <Container className="lessons__items-container">
        <LessonCard {...lesson} />
        <LessonCard {...lesson} />
        <LessonCard {...lesson} />
        <LessonCard {...lesson} />
        <LessonCard {...lesson} />
      </Container>
    </div>
  );
}

export default Lessons;
