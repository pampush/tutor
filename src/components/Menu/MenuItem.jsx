import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';

import { NavLink } from 'react-router-dom';

function MenuItem(props) {
  return (
    <ListItem
      button
      className="menu__button"
      component={NavLink}
      to={props.to}
      activeStyle={{
        
      }}>
      <ListItemIcon className="menu--center">{props.children}</ListItemIcon>
      <Hidden mdDown>
        <ListItemText primary={props.name} />
      </Hidden>
      <Collapse in={props.open} timeout="auto" unmountOnExit>
        <ListItemText primary={props.name} />
      </Collapse>
    </ListItem>
  );
}

export default MenuItem;
