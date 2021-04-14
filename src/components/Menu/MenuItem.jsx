import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';

import { NavLink } from 'react-router-dom';

function MenuItem({ children, name, open, to }) {
  return (
    <ListItem
      button
      className={open ? '' : 'menu__button'}
      component={NavLink}
      to={to}
      activeStyle={{}}>
      <ListItemIcon className="menu--center">{children}</ListItemIcon>
      <Hidden mdDown>
        <ListItemText primary={name} />
      </Hidden>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItemText primary={name} />
      </Collapse>
    </ListItem>
  );
}

export default MenuItem;
