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
import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';

function MenuSmDrawer() {
  const [open, setOpen] = React.useState(false);
  const business = useSelector(({ user }) => user.business);

  const handleDrawer = () => setOpen((prev) => !prev);

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Открыть панель навигации"
            onClick={handleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer variant="temporary" open={open} onClose={handleDrawer}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Открыть панель навигации"
              onClick={handleDrawer}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List className={'menu__list--opened'}>
          <ListItem>
            <MenuHeader />
          </ListItem>

          <MenuItem name="Расписание" to="/schedule" handleDrawer={() => setOpen(false)}>
            <CalendarTodayIcon className="menu--svg" />
          </MenuItem>
          <MenuItem name="Ученики" to="/pupils" handleDrawer={() => setOpen(false)}>
            <FaceIcon className="menu--svg" />
          </MenuItem>
          {business && (
            <MenuItem name="Финансы" to="/finance" handleDrawer={() => setOpen(false)}>
              <ShowChartIcon className="menu--svg" />
            </MenuItem>
          )}
          {/* <MenuItem name="Домашняя работа" to="/homework" handleDrawer={() => setOpen(false)}>
            <FaceIcon className="menu--svg" />
          </MenuItem> */}
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default MenuSmDrawer;
