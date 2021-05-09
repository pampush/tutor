import React from 'react';
import { MyTextField } from '../../CustomInputs';

import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function EditEmailFormInputs() {
  const [viewPassword, setViewPassword] = React.useState(false);

  const handleClickShowPassword = () => setViewPassword((prev) => !prev);

  return (
    <Grid container spacing={3} className="auth__inputs">
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

export default EditEmailFormInputs;
