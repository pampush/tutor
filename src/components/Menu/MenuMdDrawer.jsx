import React from 'react';

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
import { useSelector } from 'react-redux';

function MenuControls({ handleDrawer }) {
  const business = useSelector(({ user }) => user.business);
  return (
    <Box className="menu__nav-container">
      <MenuItem handleDrawer={() => handleDrawer(false)} name="Расписание" to="/schedule">
        <CalendarTodayIcon className="menu--svg" />
      </MenuItem>
      <MenuItem handleDrawer={() => handleDrawer(false)} name="Ученики" to="/pupils">
        <FaceIcon className="menu--svg" />
      </MenuItem>
      {business && (
        <MenuItem handleDrawer={() => handleDrawer(false)} name="Финансы" to="/finance">
          <ShowChartIcon className="menu--svg" />
        </MenuItem>
      )}
    </Box>
  );
}

function MenuMdDrawer() {
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => setOpen((prev) => !prev);

  return (
    <React.Fragment>
      <Drawer variant="permanent" anchor="left" PaperProps={{ elevation: 2 }}>
        <List className="menu__list">
          <ListItem button className="menu--center" onClick={handleDrawer}>
            <ListItemIcon className="menu--center">
              <MenuIcon className="menu--svg" />
            </ListItemIcon>
          </ListItem>

          <Divider />
          <MenuControls open={false} handleDrawer={() => {}} />
        </List>
      </Drawer>
      <Drawer variant="temporary" anchor="left" open={open} onClose={handleDrawer}>
        <List className="menu__list--opened">
          <ListItem button onClick={handleDrawer}>
            <ListItemIcon className="menu--center">
              <MenuIcon className="menu--svg" />
            </ListItemIcon>
          </ListItem>

          <ListItem>
            <MenuHeader />
          </ListItem>

          <Divider />
          <MenuControls handleDrawer={setOpen} />
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default MenuMdDrawer;
