import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

function LessonCard({ time, theme, pupil }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Card className="lesson__container">
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuList autoFocus={true} autoFocusItem={anchorEl} className="lesson__menu-container">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </MenuList>
      </Menu>
      <CardContent>
        <Box className="lesson__header">
          <Typography gutterBottom variant="h5" component="h2" className="lesson__header-text">
            {time}
          </Typography>
          <IconButton aria-label="menu" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Typography variant="h5" color="textPrimary" component="p">
          {theme}
        </Typography>
        <Typography variant="subtitle2" color="textPrimary" component="p">
          {pupil.name}, {pupil.address}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default LessonCard;
