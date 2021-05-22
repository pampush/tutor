import React from "react";
import { useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

import PupilCard from "./PupilCard";
import AddPupilForm from "../addPupilForm/AddPupilForm";
import SnackPopup from "../SnackPopup";

function PupilsList() {
  const userId = useSelector(({ user }) => user.id);
  const pupils = useSelector(({ pupils }) => pupils.items);
  const pupilsLoaded = useSelector(({ pupils }) => pupils.isLoaded);
  const schedules = useSelector(({ schedules }) => schedules.items);
  const schedulesLoaded = useSelector(({ schedules }) => schedules.isLoaded);
  const [viewAddPupilSnack, setViewAddPupilSnack] = React.useState(false);
  const [viewAddScheduleSnack, setViewAddScheduleSnack] = React.useState(false);
  const [viewEditPupilSnack, setViewEditPupilSnack] = React.useState(false);

  // React.useEffect(() => {
  //   let timer;
  //   timer = setTimeout(() => {
  //     setViewAddPupilSnack(false);
  //   }, 5000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [viewAddPupilSnack]);

  const isLoaded = pupilsLoaded && schedulesLoaded;

  const [viewAddPupilForm, setViewAddPupilForm] = React.useState(false);

  function handleAddLessonClick() {
    setViewAddPupilForm(true);
  }

  function handleCloseAddLessonForm() {
    setViewAddPupilForm(false);
  }

  function handleSnack(state) {
    setViewAddPupilSnack(state);
  }

  const handleViewAddScheduleSnack = React.useCallback(
    () => setViewAddScheduleSnack(false),
    []
  );
  const handleViewAddPupilSnack = React.useCallback(
    () => setViewAddPupilSnack(false),
    []
  );
  const handleViewEditPupilSnack = React.useCallback(
    () => setViewEditPupilSnack(false),
    []
  );

  return (
    <React.Fragment>
      <SnackPopup
        open={viewAddScheduleSnack}
        message="Шаблон для урока добавлен"
        onClose={handleViewAddScheduleSnack}
      />
      <SnackPopup
        open={viewAddPupilSnack}
        message="Ученик добавлен"
        onClose={handleViewAddPupilSnack}
      />
      <SnackPopup
        open={viewEditPupilSnack}
        message="Информация об ученике изменена"
        onClose={handleViewEditPupilSnack}
      />

      <AddPupilForm
        open={viewAddPupilForm}
        handleClose={handleCloseAddLessonForm}
        handleSnack={handleSnack}
      />

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
            onClick={handleAddLessonClick}
          >
            Новый ученик
          </Button>
        </Box>

        <Grid container spacing={2} className="pupils__card-container">
          {isLoaded
            ? Object.keys(pupils).map((key) => (
                <Grid key={key} item md={4} sm={6} xs={12}>
                  <PupilCard
                    {...pupils[key]}
                    schedules={schedules}
                    userId={userId}
                    handleSnack={setViewAddScheduleSnack}
                    handleViewEditPupilSnack={setViewEditPupilSnack}
                  />
                </Grid>
              ))
            : new Array(6).fill(0).map((_, i) => (
                <Grid key={i} item md={4} sm={6} xs={12}>
                  <Skeleton
                    key={i}
                    variant="rect"
                    className="pupils__skeleton"
                  />
                </Grid>
              ))}
        </Grid>
        {Object.keys(pupils).length === 0 && (
          <Typography>Ученики отсутствуют</Typography>
        )}
      </div>
    </React.Fragment>
  );
}

export default PupilsList;
