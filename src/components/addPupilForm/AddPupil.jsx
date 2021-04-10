import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Box from '@material-ui/core/Box';

import withWidth, { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';

import AddPupilForm from './AddPupilForm';
import AddScheduleForm from './AddScheduleForm';
import validationSchema from './validationSchema';
import formInitialValues from './formInitialValues';
import AddPupilSuccess from './AddPupilSuccess';

import { Formik, useFormikContext, Form } from 'formik';

const steps = ['Информация об ученике', 'Расписание'];
function getForm(step) {
  switch (step) {
    case 0:
      return <AddPupilForm />;
    case 1:
      return <AddScheduleForm />;
    default:
      return null;
  }
}

function AddPupil({ open, handleClose, width }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  function submitForm(values, actions) {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className="pupil-form__dialog"
      maxWidth="sm"
      fullScreen={isWidthDown('sm', width) ? true : false}>
      <DialogTitle id="form-dialog-title">Введите информацию об ученике</DialogTitle>
      <DialogContent className="pupil-form__dialog-content">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <AddPupilSuccess />
        ) : (
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={handleSubmit}>
            <Form>
              {getForm(activeStep)}

              <Box className="pupil-form__controls">
                <Button variant="contained" color="secondary" onClick={handleClose}>
                  Закрыть
                </Button>
                {activeStep !== 0 && (
                  <Button variant="contained" color="secondary" onClick={handleBack}>
                    Назад
                  </Button>
                )}
                <Button variant="contained" color="secondary" type="submit">
                  {isLastStep ? 'Подтвердить' : 'Далее'}
                </Button>
              </Box>
            </Form>
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default withWidth()(AddPupil);
