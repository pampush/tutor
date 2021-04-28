import React from 'react';
import { Formik, Form } from 'formik';
import uniqid from 'uniqid';

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import AddLessonInputs from './AddLessonInputs';
import formInitialValues from './formInitialValues';
import validationSchema from './validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { postLesson } from '../../redux/actions/lessons';

function AddLessonForm({ width, open, handleClose, handleSnack }) {
  const dispatch = useDispatch();
  const date = useSelector(({ date }) => date.selected);
  formInitialValues.date = date.toISOString().slice(0, 10);

  function handleSubmit({ price = 0, ...values }, actions) {
    let test = Object.entries(values).filter(([key, value]) => {
      if (typeof value === 'string') return value.trim();
      return true;
    });
    test = Object.fromEntries(test);

    const lesson = {
      id: uniqid(),
      schedule: null,
      price,
      timestamp: Date.now(),
      ...test,
    };
    handleSnack(true);
    handleClose();
    actions.setSubmitting(false);
    dispatch(postLesson(lesson));
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
            <AddLessonInputs />
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

export default withWidth()(AddLessonForm);
