import classNames from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FaceIcon from '@material-ui/icons/Face';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';

const useStyles = makeStyles({
  drawerPaper: {
    position: 'fixed',
    top: 'auto',
  },
});

function MenuDrawerMobile() {
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen((prev) => !prev);
  }

  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open={open}
        onClose={handleDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <List className={classNames('menu__list', { 'menu__list--opened': open })}>
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
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default MenuDrawerMobile;
