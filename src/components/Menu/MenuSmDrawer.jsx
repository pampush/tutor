import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FaceIcon from '@material-ui/icons/Face';
import ShowChartIcon from '@material-ui/icons/ShowChart';

import React from 'react';
import classNames from 'classnames';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';

const useStyles = makeStyles({
  drawerPaper: {
    position: 'fixed',
    top: 'auto',
  },
});

function MenuDrawerMobile() {
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => setOpen((prev) => !prev);

  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List className={classNames('menu__list', { 'menu__list--opened': open })}>
          <ListItem>
            <MenuHeader />
          </ListItem>

          <MenuItem open={open} name="Расписание" to="/schedule">
            <CalendarTodayIcon className="menu--svg" />
          </MenuItem>
          <MenuItem open={open} name="Ученики" to="/pupils">
            <FaceIcon className="menu--svg" />
          </MenuItem>
          <MenuItem open={open} name="Финансы" to="/finance">
            <ShowChartIcon className="menu--svg" />
          </MenuItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default MenuDrawerMobile;
