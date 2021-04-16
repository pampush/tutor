import React from 'react';

import Grid from '@material-ui/core/Grid';

import { MyTextField } from '../../CustomInputs';

function LoginInputs() {
  return (
    <React.Fragment>
      <Grid container spacing={3} className="signup__inputs">
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
      </Grid>
    </React.Fragment>
  );
}

export default LoginInputs;
