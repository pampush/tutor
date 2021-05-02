import React from 'react';
import { IconButton, Snackbar, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Grow from '@material-ui/core/Grow';

function SnackPopup({ open, message, onClose }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      message={message}
      TransitionComponent={Grow}
      autoHideDuration={3000}
      onClose={onClose}
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

export default React.memo(SnackPopup);
