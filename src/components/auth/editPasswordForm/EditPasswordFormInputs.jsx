import React from 'react';

import { Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { MyTextField } from '../../CustomInputs';

function EditPasswordFormInputs() {
  const [viewPassword, setViewPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setViewPassword((prev) => !prev);
  };

  return (
    <Grid container spacing={3} className="auth__inputs">
      <input type="text" autoComplete="username" hidden={true}></input>
      <Grid item xs={12}>
        <MyTextField
          variant="outlined"
          fullWidth
          name="oldpassword"
          label="Старый пароль"
          type={viewPassword ? 'text' : 'password'}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Показать пароль"
                  onClick={handleClickShowPassword}>
                  {viewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <MyTextField
          variant="outlined"
          fullWidth
          name="password"
          label="Новый пароль"
          type={viewPassword ? 'text' : 'password'}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Показать пароль"
                  onClick={handleClickShowPassword}>
                  {viewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <MyTextField
          variant="outlined"
          fullWidth
          name="passwordConfirmation"
          label="Повторите пароль"
          type={viewPassword ? 'text' : 'password'}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Показать пароль"
                  onClick={handleClickShowPassword}>
                  {viewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
}

export default EditPasswordFormInputs;
