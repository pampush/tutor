import React from 'react';

import { Grid } from '@material-ui/core';

import { MyTextField } from '../../CustomInputs';

function EditUserFormInputs() {
  return (
    <Grid container spacing={3} className="auth__inputs">
      <Grid item xs={12}>
        <MyTextField
          autoComplete="fname"
          name="firstName"
          variant="outlined"
          fullWidth
          label="Имя"
          autoFocus
        />
      </Grid>
      <Grid item xs={12}>
        <MyTextField
          variant="outlined"
          fullWidth
          label="Фамилия"
          name="lastName"
          autoComplete="lname"
        />
      </Grid>
    </Grid>
  );
}

export default EditUserFormInputs;
