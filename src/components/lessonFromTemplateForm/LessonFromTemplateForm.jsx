import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { formatISO } from 'date-fns'

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import LessonFromTemplateInputs from './LessonFromTemplateInputs';
import formInitialValues from './formInitialValues';
import validationSchema from './validationSchema';

import { fetchScheduledLessons } from '../../redux/actions/scheduledLessons';
import lessonFromTemplate from '../../redux/actions/lessonFromTemplate';

function LessonFromTemplateForm({ width, open, handleClose, pupilId, scheduleId, handleSnack }) {
  const dispatch = useDispatch();

  const schedule = useSelector(({ schedules }) => schedules.items[scheduleId]);
  const date = useSelector(({ date }) => date.selected);

  async function handleSubmit(values, actions) {
    let test = Object.entries(values).filter(([key, value]) => {
      if (typeof value === 'string') return value.trim();
      return true;
    });
    test = Object.fromEntries(test);

    const lesson = {
      id: uniqid(),
      date: formatISO(date, {representation: 'date'}),
      time: schedule.time,
      schedule: scheduleId,
      pupil: pupilId,
      subject: schedule.subject,
      price: schedule.price,
      timestamp: Date.now(),
      ...test,
    };

    actions.setSubmitting(false);
    handleSnack(true);

    await dispatch(lessonFromTemplate(lesson));
    dispatch(fetchScheduledLessons(date));
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
            <LessonFromTemplateInputs />
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

export default withWidth()(LessonFromTemplateForm);
