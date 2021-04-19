import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';

function MenuHeader() {
  const name = useSelector(({ user }) => user.name);
  return (
    <Grid container className="menu__header">
      <Grid item xs={8} className="menu__avatar">
        <AccountCircleIcon />
      </Grid>
      <Grid item xs={4} className="menu__button menu__settings" component={NavLink} to="/settings">
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{name}</Typography>
      </Grid>
    </Grid>
  );
}

export default MenuHeader;
