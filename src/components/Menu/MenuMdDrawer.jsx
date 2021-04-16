import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FaceIcon from '@material-ui/icons/Face';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';

import MenuItem from './MenuItem';

function MenuControls({ open }) {
  return (
    <Box className="menu__nav-container">
      <MenuItem
        open={open}
        name="Расписание"
        to="/schedule">
        <CalendarTodayIcon className="menu--svg" />
      </MenuItem>
      <MenuItem
        open={open}
        name="Ученики"
        to="/pupils">
        <FaceIcon className="menu--svg" />
      </MenuItem>
      <MenuItem
        open={open}
        name="Финансы"
        to="/finance">
        <ShowChartIcon className="menu--svg" />
      </MenuItem>
    </Box>
  );
}

function MenuMdDrawer() {
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => setOpen((prev) => !prev);

  return (
    <Drawer
      variant={open ? 'temporary' : 'permanent'}
      anchor="left"
      open={open}
      onClose={handleDrawer}>
      <List className={classNames('menu__list', { 'menu__list--opened': open })}>
        <ListItem button className={open ? '' : 'menu--center'} onClick={handleDrawer}>
          <ListItemIcon className="menu--center">
            <MenuIcon className="menu--svg" />
          </ListItemIcon>
        </ListItem>

        {open && (
          <ListItem>
            <Grid container className="menu__header">
              <Grid item xs={6} className="menu__avatar">
                <AccountCircleIcon />
              </Grid>
              <Grid
                item
                xs={6}
                className="menu__settings menu__button"
                component={NavLink}
                to="/settings">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Евгений Робертович Поганин</Typography>
              </Grid>
            </Grid>
          </ListItem>
        )}

        <Divider />
        <MenuControls open={open} />
      </List>
    </Drawer>
  );
}

export default MenuMdDrawer;
