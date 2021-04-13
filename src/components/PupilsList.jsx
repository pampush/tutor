import React from 'react';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

import PupilCard from './PupilCard';
import AddPupilForm from './addPupilForm/AddPupilForm';
import SnackPopup from './SnackPopup';

function PupilsList() {
  const pupils = useSelector(({ pupils }) => pupils.items);
  const pupilsLoaded = useSelector(({ pupils }) => pupils.isLoaded);
  const schedules = useSelector(({ schedules }) => schedules.items);
  const schedulesLoaded = useSelector(({ schedules }) => schedules.isLoaded);
  const [snackView, setSnackView] = React.useState(false);

  /**
   * prevent React state update on unmounted component!
   */
  React.useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setSnackView(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [snackView]);

  const isLoaded = pupilsLoaded && schedulesLoaded;

  const [viewAddPupilForm, setViewAddPupilForm] = React.useState(false);

  function handleAddLessonClick() {
    setViewAddPupilForm(true);
  }

  function handleCloseAddLessonForm() {
    setViewAddPupilForm(false);
  }

  function handleSnack(state) {
    setSnackView(state);
  }

  return (
    <div>
      <Box className="pupils__header-container">
        <Typography variant="h5" className="pupils__header">
          Ученики
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          className="pupils__button-text"
          onClick={handleAddLessonClick}>
          Новый ученик
        </Button>
      </Box>

      {viewAddPupilForm && (
        <AddPupilForm
          open={viewAddPupilForm}
          handleClose={handleCloseAddLessonForm}
          handleSnack={handleSnack}
        />
      )}

      <SnackPopup open={snackView} message="Ученик добавлен"/>

      <Grid container spacing={2} className="pupils__card-container">
        {isLoaded
          ? Object.keys(pupils).map((key) => (
              <Grid key={key} item md={4} sm={6} xs={12}>
                <PupilCard {...pupils[key]} schedules={schedules} />
              </Grid>
            ))
          : new Array(6).fill(0).map((_, i) => (
              <Grid key={i} item md={4} sm={6} xs={12}>
                <Skeleton key={i} variant="rect" className="pupils__skeleton" />
              </Grid>
            ))}
      </Grid>
    </div>
  );
}

export default PupilsList;
