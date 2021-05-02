import React from 'react';

import { Formik, Form } from 'formik';

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';

import EditUserFormInputs from './EditUserFormInputs';
import initialValues from './initialValues';
import validationSchema from './validationSchema';
import { AuthContext } from '../../../contexts/AuthContext';

function EditUserForm({ width, open, handleClose, handleSnack }) {
  const { currentUser, updateUser } = React.useContext(AuthContext);

  function handleSubmit(values, actions) {
    actions.setSubmitting(false);
    handleSnack(true);
    handleClose();

    const name = values.firstName + ' ' + values.lastName;
    updateUser(name);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-email"
      className="pupil-form__dialog"
      maxWidth="sm"
      fullScreen={isWidthDown('sm', width) ? true : false}>
      <DialogTitle>Измените имя и фамилию</DialogTitle>
      <DialogContent className="lesson-form__dialog-content">
        <Formik
          initialValues={initialValues(currentUser.displayName)}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          <Form>
            <EditUserFormInputs />
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

export default withWidth()(EditUserForm);
