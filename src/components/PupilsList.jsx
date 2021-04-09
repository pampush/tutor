import React from 'react';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

import PupilCard from './PupilCard';
import Skeleton from '@material-ui/lab/Skeleton';

import { AddPupil } from '.';

function PupilsList({ anchor, handleClick }) {
  const pupils = useSelector(({ pupils }) => pupils.items);
  const pupilsLoaded = useSelector(({ pupils }) => pupils.isLoaded);
  const schedules = useSelector(({ schedules }) => schedules.items);
  const schedulesLoaded = useSelector(({ schedules }) => schedules.isLoaded);

  const isLoaded = pupilsLoaded && schedulesLoaded;

  const [addLessonClicked, setAddLessonClicked] = React.useState(false);

  function handleAddLessonClick() {
    setAddLessonClicked(true);
  }

  function handleCloseAddLessonForm() {
    setAddLessonClicked(false);
  }

  return (
    <div>
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

      {addLessonClicked && (
        <AddPupil open={addLessonClicked} handleClose={handleCloseAddLessonForm} />
      )}

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
