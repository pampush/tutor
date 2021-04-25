import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';

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

function EditScheduleForm({ open, width, id, handleClose, day, time, subject, price }) {
  const dispatch = useDispatch();

  function handleSubmit(values, actions) {
    actions.setSubmitting(false);
    dispatch(
      updateScheduleAction(id, {
        day: values.day,
        time: values.time,
        subject: values.subject,
        price: values.price,
      }),
    );
    handleClose();
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
