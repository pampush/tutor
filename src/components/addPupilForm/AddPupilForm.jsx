import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

import AddPupilInputs from './AddPupilInputs';
import AddScheduleInputs from './AddScheduleInputs';
import validationSchema from './validationSchema';
import formInitialValues from './formInitialValues';
import formHandler from '../../redux/actions/newPupil';
import { fetchScheduledLessons } from '../../redux/actions/scheduledLessons';

const steps = ['Информация об ученике', 'Расписание'];
function getForm(step) {
  switch (step) {
    case 0:
      return <AddPupilInputs />;
    case 1:
      return <AddScheduleInputs />;
    default:
      return null;
  }
}

function AddPupilForm({ open, handleClose, width, handleSnack }) {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const today = useSelector(({ date }) => date.selected);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      handleSnack(true);
      handleClose();
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  async function submitForm(values, actions) {
    actions.setSubmitting(false);

    await dispatch(formHandler(values));
    dispatch(fetchScheduledLessons(today));
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onExited={() => {
        setActiveStep(0);
      }}
      aria-labelledby="form-dialog-title"
      className="pupil-form__dialog"
      maxWidth="sm"
      fullScreen={isWidthDown('sm', width) ? true : false}>
      <DialogTitle>Введите информацию об ученике</DialogTitle>
      <DialogContent className="pupil-form__dialog-content">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
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
      </DialogContent>
    </Dialog>
  );
}

export default withWidth()(AddPupilForm);
