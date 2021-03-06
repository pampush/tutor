import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

import ThemeFormInputs from './ThemeFormInputs';
import initialValues from './initialValues';
import validationSchema from './validationSchema';
import { changeLesson } from '../../redux/actions/lessons';

const useStyles = makeStyles({
  paper: {
    width: '600px',
  },
});

function ThemeForm({ open, width, handleClose, id, lessonTheme, handleSnack }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  async function handleSubmit(values, actions) {
    actions.setSubmitting(false);
    handleSnack(true);
    handleClose();
    dispatch(changeLesson(id, { theme: values.theme }));
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className="pupil-form__dialog"
      classes={{ paper: classes.paper }}
      maxWidth="md"
      fullScreen={isWidthDown('sm', width) ? true : false}>
      <DialogTitle>Заметки об уроке</DialogTitle>
      <DialogContent className="lesson-form__dialog-content">
        <Formik
          initialValues={initialValues(lessonTheme)}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form>
            <ThemeFormInputs />
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

export default withWidth()(ThemeForm);
