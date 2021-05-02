import React from 'react';
import { Formik, Form } from 'formik';

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import EditPasswordFormInputs from './EditPasswordFormInputs';
import initialValues from './initialValues';
import validationSchema from './validationSchema';
import { AuthContext } from '../../../contexts/AuthContext';

function EditPasswordForm({ width, open, handleClose, handleSnack }) {
  const { reAuth, updatePassword } = React.useContext(AuthContext);

  async function handleSubmit(values, actions) {
    actions.setSubmitting(false);
    handleSnack(true);
    handleClose();

    await reAuth(values.oldpassword);
    updatePassword(values.passwordConfirmation);
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
            <EditPasswordFormInputs />
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

export default withWidth()(EditPasswordForm);
