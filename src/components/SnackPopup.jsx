import React from 'react';
import { IconButton, Snackbar, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function SnackPopup({ open, message }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      message={message}
      action={
        <React.Fragment>
          <Button color="secondary" size="small">
            Отменить
          </Button>
          <IconButton size="small" aria-label="close" color="inherit">
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}

export default SnackPopup;
