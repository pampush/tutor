import React from 'react';

import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { MyTextField } from '../../CustomInputs';

function SignupInputs() {
  const [viewPassword, setViewPassword] = React.useState(false);
  const handleClickShowPassword = () => setViewPassword((prev) => !prev);

  return (
    <React.Fragment>
      <Grid container spacing={3} className="auth__inputs">
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
            type={viewPassword ? 'text' : 'password'}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}>
                    {viewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SignupInputs;