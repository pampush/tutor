import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { NavLink } from 'react-router-dom';

function MenuItem({ children, name, to, handleDrawer }) {
  return (
    <ListItem
      button
      className="menu__button menu__button--center"
      component={NavLink}
      to={to}
      onClick={handleDrawer}>
      <ListItemIcon className="menu--center">{children}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
}

export default MenuItem;
