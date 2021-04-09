import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import AddPupilForm from './AddPupilForm';
import AddScheduleForm from './AddScheduleForm';

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

function AddPupil({ open, handleClose }) {
  const [activeStep, setActiveStep] = React.useState(0);

  function handleNext() {
    setActiveStep((prev) => prev + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {};

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Введите информацию об ученике</DialogTitle>
      <DialogContent>
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

        {getForm(activeStep)}
      </DialogContent>

      <DialogActions>
        {activeStep !== 0 && (
          <Button variant="contained" color="secondary" onClick={handleBack}>
            Назад
          </Button>
        )}

        {activeStep !== steps.length - 1 ? (
          <Button variant="contained" color="secondary" onClick={handleNext}>
            Далее
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleFinish}>
            Подтвердить
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default AddPupil;
