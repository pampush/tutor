import React from 'react';
import classNames from 'classnames';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FaceIcon from '@material-ui/icons/Face';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import MenuIcon from '@material-ui/icons/Menu';

import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';

function MenuControls({ open }) {
  return (
    <Box className="menu__nav-container">
      <MenuItem open={open} name="Расписание" to="/schedule">
        <CalendarTodayIcon className="menu--svg" />
      </MenuItem>
      <MenuItem open={open} name="Ученики" to="/pupils">
        <FaceIcon className="menu--svg" />
      </MenuItem>
      <MenuItem open={open} name="Финансы" to="/finance">
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
            <MenuHeader />
          </ListItem>
        )}

        <Divider />
        <MenuControls open={open} />
      </List>
    </Drawer>
  );
}

export default MenuMdDrawer;