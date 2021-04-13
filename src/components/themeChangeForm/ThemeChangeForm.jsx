import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import ThemeChangeInputs from './ThemeChangeInputs';
import formInitialValues from './formInitialValues';
import validationSchema from './validationSchema';

import { postLesson } from '../../redux/actions/lessons';
import { updDbSchedule } from '../../redux/actions/schedules';
import { fetchScheduledLessons } from '../../redux/actions/scheduledLessons';
import { combineDispatches } from '../../redux/actions/combineDispatches';
import { setScheduledLessonsLoaded } from '../../redux/actions/scheduledLessons';

function ThemeChangeForm({ width, open, handleClose, pupilId, scheduleId, handleSnack }) {
  const dispatch = useDispatch();

  const schedule = useSelector(({ schedules }) => schedules.items[scheduleId]);
  const date = useSelector(({ date }) => date.selected);

  function handleSubmit(values, actions) {
    const lesson = {
      id: uniqid(),
      date: date.toISOString().slice(0, 10),
      time: schedule.time,
      schedule: scheduleId,
      pupil: pupilId,
      theme: values.theme,
      subject: schedule.subject,
    };

    actions.setSubmitting(false);
    handleSnack(true);

    /**
     * bicycle for async chained invocations
     * preventIsLoaded prevents isLoaded redux property action call
     */
    combineDispatches(
      () => dispatch(setScheduledLessonsLoaded(false)),
      () => dispatch(postLesson(lesson, { preventIsLoaded: true })),
      () =>
        dispatch(updDbSchedule({ date: lesson.date, id: scheduleId }, { preventIsLoaded: true })),
      () => dispatch(fetchScheduledLessons(date, { preventIsLoaded: true })),
    );

    //dispatch(postLesson(lesson));
    //dispatch(updDbSchedule({ date: lesson.date, id: scheduleId }));
    //dispatch(fetchScheduledLessons(date));
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className="pupil-form__dialog"
      maxWidth="sm"
      fullScreen={isWidthDown('sm', width) ? true : false}>
      <DialogTitle>Введите информацию об уроке</DialogTitle>
      <DialogContent className="lesson-form__dialog-content">
        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form>
            <ThemeChangeInputs />
            <Box className="lesson-form__controls">
              <Button variant="contained" color="secondary" onClick={handleClose}>
                Закрыть
              </Button>
              <Button variant="contained" color="secondary" type="submit">
                Подтвердить
              </Button>
            </Box>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default withWidth()(ThemeChangeForm);
