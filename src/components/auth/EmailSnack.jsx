import React from 'react';
import { Snackbar, Typography } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  paper: {
    backgroundColor: '#4caf50',
  },
});

function EmailSnack({ open, message, onClose }) {
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      message={
        <React.Fragment>
          <CheckCircleOutlineIcon />
          <Typography variant="body1">{message}</Typography>
        </React.Fragment>
      }
      ContentProps={{ classes: { root: classes.paper } }}
      open={open}
      TransitionComponent={Grow}
      autoHideDuration={3000}
      onClose={onClose}
    />
  );
}

export default EmailSnack;
