import classNames from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FaceIcon from '@material-ui/icons/Face';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';

import React from 'react';
import MenuItem from './MenuItem';

function MenuDrawer() {
  return (
    <Drawer variant="permanent" anchor="left">
      <List className={classNames('menu__list')}>
        <ListItem>
          <Grid container className="menu__header">
            <Grid item xs={6} className="menu__avatar">
              <AccountCircleIcon />
            </Grid>
            <Grid item xs={6} className="menu__settings">
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Евгений Робертович Поганин</Typography>
            </Grid>
          </Grid>
        </ListItem>

        <Divider />

        <Box class="menu__nav-container">
          <MenuItem open={false} name="Расписание" to="/schedule">
            <CalendarTodayIcon className="menu--svg" />
          </MenuItem>
          <MenuItem open={false} name="Ученики" to="/pupils">
            <FaceIcon className="menu--svg" />
          </MenuItem>
          <MenuItem open={false} name="Финансы" to="finance">
            <ShowChartIcon className="menu--svg" />
          </MenuItem>
        </Box>
      </List>
    </Drawer>
  );
}

export default MenuDrawer;
