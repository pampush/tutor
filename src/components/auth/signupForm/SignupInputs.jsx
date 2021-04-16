import React from 'react';

import Grid from '@material-ui/core/Grid';

import { MyTextField } from '../../CustomInputs';

function SignupInputs() {
  return (
    <React.Fragment>
      <Grid container spacing={3} className="signup__inputs">
        <Grid item xs={12} sm={6}>
          <MyTextField
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            fullWidth
            label="Имя"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MyTextField
            variant="outlined"
            fullWidth
            label="Фамилия"
            name="lastName"
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            variant="outlined"
            fullWidth
            label="Email адрес"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            variant="outlined"
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            autoComplete="current-password"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

export default SignupInputs;
