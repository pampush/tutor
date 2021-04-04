import classNames from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FaceIcon from '@material-ui/icons/Face';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';

import React from 'react';

function MenuDrawer({ open, handleDrawerOpen }) {
  return (
    <Drawer variant="permanent" anchor="left" open={open}>
      <List className={classNames('menu__list', { 'menu__list--closed': open })}>
        <Hidden lgUp>
            <ListItem button className="menu--center" onClick={handleDrawerOpen}>
              <ListItemIcon className="menu--center">
                <MenuIcon className="menu--svg" />
              </ListItemIcon>
            </ListItem>
          </Hidden>

        {open && (
          <ListItem>
            <Grid container className="menu__header">
              <Grid item xs={6} className="menu__avatar">
                <AccountCircleIcon />
              </Grid>
              <Grid item xs={6} className="menu__settings">
                <SettingsIcon />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Евгений Робертович Поганин</Typography>
              </Grid>
            </Grid>
          </ListItem>
        )}

        

        <Divider />

        <ListItem button className="menu--center">
          <ListItemIcon className="menu--center">
            <CalendarTodayIcon className="menu--svg" />
          </ListItemIcon>
          <ListItemText primary="Расписание" />
        </ListItem>

        <ListItem button className="menu--center">
          <ListItemIcon className="menu--center">
            <FaceIcon className="menu--svg" />
          </ListItemIcon>
          <ListItemText primary="Ученики" />
        </ListItem>

        <ListItem button className="menu--center">
          <ListItemIcon className="menu--center">
            <ShowChartIcon className="menu--svg" />
          </ListItemIcon>
          <ListItemText primary="Финансы" />
        </ListItem>

        <Hidden lgUp>
          <ListItem button className="menu--center">
            <ListItemIcon className="menu--center">
              <SettingsIcon className="menu--svg" />
            </ListItemIcon>
          </ListItem>
        </Hidden>
      </List>
    </Drawer>
  );
}

export default MenuDrawer;
