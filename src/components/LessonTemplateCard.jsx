import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import LessonFromTemplateForm from './lessonFromTemplateForm/LessonFromTemplateForm';

function LessonTemplateCard({ time, pupilId, scheduleId, subject, name, address, handleSnack }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [viewForm, setViewForm] = React.useState(false);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCloseForm = () => setViewForm(false);
  const handleOpenForm = () => setViewForm(true);

  return (
    <React.Fragment>
      <LessonFromTemplateForm
        open={viewForm}
        pupilId={pupilId}
        scheduleId={scheduleId}
        handleClose={handleCloseForm}
        handleSnack={handleSnack}
      />

      <Card className="lesson__container lesson__container--template">
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuList autoFocus={true} className="lesson__menu-container">
            <MenuItem onClick={handleOpenForm}>Добавить урок из шаблона</MenuItem>
          </MenuList>
        </Menu>
        <CardContent>
          <Box className="lesson__header">
            <Typography gutterBottom variant="h5" className="lesson__header-text">
              {time} {subject} (шаблон урока)
            </Typography>
            <IconButton aria-label="menu" className="lesson__header-more" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <Typography variant="h5" color="textPrimary" className="lesson__theme" component="p">
            Введите тему урока, открыв меню справа
          </Typography>
          <Typography variant="subtitle2" color="textPrimary" component="p">
            {name}, {address}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

LessonTemplateCard.propTypes = {
  time: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default LessonTemplateCard;