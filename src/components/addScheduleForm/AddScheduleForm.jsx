import React from 'react';
import { Formik, Form } from 'formik';
import uniqid from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import initialValues from './initialValues';
import validationSchema from './validationSchema';
import AddScheduleInputs from './AddScheduleInputs';
import { postSchedule } from '../../redux/actions/schedules';
import { fetchScheduledLessons } from '../../redux/actions/scheduledLessons';
import { pushScheduleToPupil } from '../../redux/actions/pupils';

function AddScheduleForm({ open, id, handleClose, width, handleSnack }) {
  const dispatch = useDispatch();
  const date = useSelector(({ date }) => date.selected);
  async function handleSubmit(values, actions) {
    const schedule = {
      id: uniqid(),
      day: +values.day,
      lessons: [],
      price: +values.price,
      pupil: id,
      subject: values.subject,
      time: values.time,
      timestamp: Date.now(),
      year: new Date().getFullYear(),
    };
    actions.setSubmitting(false);
    handleSnack(true);
    handleClose();
    await Promise.all[
      dispatch(postSchedule([schedule]), dispatch(pushScheduleToPupil(id, schedule.id)))
    ];
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
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form>
            <AddScheduleInputs />
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

export default withWidth()(AddScheduleForm);
