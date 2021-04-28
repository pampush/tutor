import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import EditLessonInputs from './EditLessonInputs';
import initialValues from './initialValues';
import validationSchema from '../addLessonForm/validationSchema';
import { changeLesson } from '../../redux/actions/lessons';

function EditLessonForm({ width, open, id, handleClose, handleSnack, ...data }) {
  const dispatch = useDispatch();

  function handleSubmit(values, actions) {
    actions.setSubmitting(false);
    handleClose();
    dispatch(changeLesson(id, values));
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className="pupil-form__dialog"
      maxWidth="sm"
      fullScreen={isWidthDown('sm', width) ? true : false}>
      <DialogTitle>Измените данные об внеплановом уроке </DialogTitle>
      <DialogContent className="lesson-form__dialog-content">
        <Formik
          initialValues={initialValues(data)}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form>
            <EditLessonInputs />
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

export default withWidth()(EditLessonForm);
