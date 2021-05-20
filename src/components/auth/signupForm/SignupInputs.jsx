import React from "react";

import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import { MyTextField, MyCheckBox } from "../../CustomInputs";
import { Popper, Typography, Paper, makeStyles } from "@material-ui/core";

import orange from "@material-ui/core/colors/orange";
const useStyles = makeStyles({
  checkboxRoot: {
    "&:hover": {
      backgroundColor: "transparent",
      color: orange[500],
    },
  },
  checkBoxButton: {
    "&:hover": {
      color: orange[500],
    },
  },
});

function SignupInputs() {
  const classes = useStyles();
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
          type={viewPassword ? "text" : "password"}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {viewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <MyCheckBox
              name="business"
              classes={{ root: classes.checkboxRoot }}
            />
          }
          label="Статус ИП"
        />

        <IconButton onClick={handleBusiness} className={classes.checkBoxButton}>
          <HelpOutlineIcon />
        </IconButton>
        <Popper open={anchorEl ? true : false} anchorEl={anchorEl}>
          <Paper elevation={3}>
            <Typography>
              Оставляя поле пустым, вы лишаетесь доступа к ведению финансовой
              статистики
            </Typography>
          </Paper>
        </Popper>
      </Grid>
    </Grid>
  );
}

export default SignupInputs;
