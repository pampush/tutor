import React from 'react';
import { Link } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  paper: {
    height: '500px',
  },
  container: {
    marginBottom: '20px',
  },
  main: {
    paddingTop: '20px',
  },
  button: {
    backgroundColor: '#ff9800',
    color: '#FFFFFF',
    fontWeight: '600',
    borderRadius: '4px',
  },
});

function Instruction({ open, handleClose }) {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      className={`instruction__container`}
      classes={{
        paper: classes.paper,
      }}
      maxWidth="md">
      <Box p={5} pt={5}>
        <Typography variant="h4">Знакомство с приложением</Typography>
        <Box mb={5} mt={2}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            className="lessons__button-text"
            disabled>
            Новый урок
          </Button>
          <Typography variant="body1">используется для создания уроков вне расписания</Typography>
        </Box>
        <Box mb={5}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            className="pupils__button-text"
            disabled>
            Новый ученик
          </Button>
          <Typography variant="body1">
            используется для создания ученика и расписания уроков
          </Typography>
        </Box>
        <Box>
          <ListItem
            button
            component={Link}
            to="/schedule"
            className={classes.button}
            onClick={() => handleClose(false)}>
            Далее
          </ListItem>
        </Box>
      </Box>
    </Dialog>
  );
}

export default Instruction;
