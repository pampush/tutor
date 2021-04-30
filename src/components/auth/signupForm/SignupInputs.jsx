import React from 'react';

import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import { MyTextField, MyCheckBox } from '../../CustomInputs';
import { Popper, Typography, Paper } from '@material-ui/core';

function SignupInputs() {
  const [viewPassword, setViewPassword] = React.useState(false);
  const handleClickShowPassword = () => setViewPassword((prev) => !prev);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleBusiness(e) {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  }

  return (
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
      <Grid item xs={12}>
        <FormControlLabel control={<MyCheckBox name="business" />} label="Статус ИП" />

        <IconButton onClick={handleBusiness}>
          <HelpOutlineIcon />
        </IconButton>
        <Popper open={anchorEl ? true : false} anchorEl={anchorEl}>
          <Paper elevation={3}>
            <Typography>
              Оставляя поле пустым, вы лишаетесь доступа к ведению финансовой статистики
            </Typography>
          </Paper>
        </Popper>
      </Grid>
    </Grid>
  );
}

export default SignupInputs;
