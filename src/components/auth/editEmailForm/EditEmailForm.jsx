import React from 'react';
import { Formik, Form } from 'formik';

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import initialValues from './initialValues';
import validationSchema from './validationSchema';
import EditEmailFormInputs from './EditEmailFormInputs';
import { AuthContext } from '../../../contexts/AuthContext';

function EditEmailForm({ width, open, handleClose }) {
  const { reAuth, verifyBeforeUpdateEmail } = React.useContext(AuthContext);

  async function handleSubmit(values, actions) {
    actions.setSubmitting(false);
    await reAuth(values.password);
    verifyBeforeUpdateEmail(values.email);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-email"
      className="pupil-form__dialog"
      maxWidth="sm"
      fullScreen={isWidthDown('sm', width) ? true : false}>
      <DialogTitle>Введите новый адрес электронной почты</DialogTitle>
      <DialogContent className="lesson-form__dialog-content">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form>
            <EditEmailFormInputs />
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

export default withWidth()(EditEmailForm);
