import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import initialValues from './initialValues';
import validationSchema from '../addScheduleForm/validationSchema';
import EditScheduleFormInputs from './EditScheduleFormInputs';
import { updateScheduleAction } from '../../redux/actions/schedules';
import { fetchScheduledLessons } from '../../redux/actions/scheduledLessons';

function EditScheduleForm({ open, width, id, handleClose, day, time, subject, price }) {
  const dispatch = useDispatch();
  const date = useSelector(({ date }) => date.selected);

  async function handleSubmit(values, actions) {
    actions.setSubmitting(false);
    handleClose();
    await dispatch(
      updateScheduleAction(id, {
        time: values.time,
        day: +values.day,
        subject: values.subject,
        price: +values.price,
      }),
    );
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
          initialValues={initialValues({ day: `${day}`, time, subject, price })}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form>
            <EditScheduleFormInputs />
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

export default withWidth()(EditScheduleForm);
