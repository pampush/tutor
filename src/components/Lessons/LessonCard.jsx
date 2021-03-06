import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import SpeedIcon from "@material-ui/icons/Speed";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";

import NotesForm from "../notesForm/NotesForm";
import ThemeForm from "../themeForm/ThemeForm";
import { deleteLesson } from "../../redux/actions/lessons";
import { deleteLessonFromSchedule } from "../../redux/actions/schedules";
import { fetchScheduledLessons } from "../../redux/actions/scheduledLessons";
import EditLessonForm from "../editLessonForm/EditLessonForm";

function LessonCard({
  id,
  time,
  date,
  name,
  theme,
  price,
  pupil,
  note = "",
  address = "",
  subject,
  schedule,
  userId,
  handleSnack,
  handleDeleteSnack,
  handleLessonThemeEditSnack,
  handleSnackLessonEdit,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [viewNotesForm, setViewNotesForm] = React.useState(false);
  const [viewThemeForm, setViewThemeForm] = React.useState(false);
  const [viewEditForm, setViewEditForm] = React.useState(false);
  const selectedDate = useSelector(({ date }) => date.selected);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  /**
   * How does dispatch actually work?
   * Am I supposed to chain dispatches to make sure async requests queuing in sequence?
   */
  async function handleDelete() {
    await dispatch(deleteLesson(id));
    handleDeleteSnack(true);
    if (schedule) {
      await dispatch(deleteLessonFromSchedule({ id: schedule, date }));
      dispatch(fetchScheduledLessons(selectedDate));
    } else dispatch(fetchScheduledLessons(selectedDate));
  }

  function handleHomework() {
    history.push(`/homework/${userId}/${pupil}/${date}`);
  }

  const clickNotesForm = () => setViewNotesForm(true);
  const closeNotesForm = () => setViewNotesForm(false);
  return (
    <React.Fragment>
      <NotesForm
        open={viewNotesForm}
        handleSnack={handleSnack}
        note={note}
        id={id}
        handleClose={closeNotesForm}
      />

      <ThemeForm
        open={viewThemeForm}
        lessonTheme={theme}
        handleSnack={handleLessonThemeEditSnack}
        id={id}
        handleClose={() => setViewThemeForm(false)}
      />

      <EditLessonForm
        open={viewEditForm}
        lessonTheme={theme}
        id={id}
        time={time}
        date={date}
        pupil={pupil}
        subject={subject}
        price={price}
        note={note}
        handleClose={() => setViewEditForm(false)}
        handleSnack={handleSnackLessonEdit}
      />
      <Card className="lesson__container">
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuList autoFocus={true} className="lesson__menu-container">
            <MenuItem onClick={handleHomework}>???????????????? ????????????</MenuItem>
            <MenuItem onClick={clickNotesForm}>??????????????</MenuItem>
            <MenuItem onClick={handleClose}>push(disabled)</MenuItem>
            {schedule ? (
              <MenuItem onClick={() => setViewThemeForm(true)}>
                ?????????????????????????? ????????
              </MenuItem>
            ) : (
              <MenuItem onClick={() => setViewEditForm(true)}>
                ?????????????????????????? ????????
              </MenuItem>
            )}
            <MenuItem onClick={handleDelete}>??????????????</MenuItem>
          </MenuList>
        </Menu>
        <CardContent>
          <Box className="lesson__header">
            <Typography
              gutterBottom
              variant="h5"
              className="lesson__header-text"
            >
              {time} {subject}
            </Typography>
            <IconButton
              aria-label="????????"
              className="lesson__header-more"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            color="textPrimary"
            className="lesson__theme"
            component="p"
          >
            {theme}
          </Typography>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="subtitle2" color="textPrimary" component="p">
                {name}, {address}
              </Typography>
            </Grid>
            <Grid item>
              {!schedule && (
                <Tooltip
                  title="??????. ???????? ?????? ????????????????????"
                  aria-label="??????. ???????? ?????? ????????????????????"
                >
                  <SpeedIcon />
                </Tooltip>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

LessonCard.propTypes = {
  time: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string,
  note: PropTypes.string,
  theme: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default LessonCard;
