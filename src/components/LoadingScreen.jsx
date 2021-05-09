import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  paper: {
    backgroundColor: 'transparent',
    width: '100px',
    height: '100px',
  },
});

function LoadingScreen({ open }) {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      classes={{
        paper: classes.paper,
      }}
      BackdropProps={{ style: { backgroundColor: '#fafafa' } }}
      PaperProps={{ elevation: 0 }}>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
}

export default LoadingScreen;
