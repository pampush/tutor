import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Grow from '@material-ui/core/Grow';

function ErrorSnack({ open, message, onClose }) {
  return (
    <Snackbar
      open={open}
      message={
        <React.Fragment>
          <ErrorOutlineIcon />
          <Typography variant="body1">{message}</Typography>
        </React.Fragment>
      }
      TransitionComponent={Grow}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      autoHideDuration={2000}
      onClose={() => onClose(false)}
      className="auth__snackbar"
    />
  );
}

export default ErrorSnack;
