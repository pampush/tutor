import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FaceIcon from '@material-ui/icons/Face';
import ShowChartIcon from '@material-ui/icons/ShowChart';

import React from 'react';
import MenuItem from './MenuItem';
import MenuHeader from './MenuHeader';
import { useSelector } from 'react-redux';

function MenuLgDrawer() {
  const business = useSelector(({ user }) => user.business);

  return (
    <Drawer variant="permanent" anchor="left" PaperProps={{ elevation: 2 }}>
      <List className={'menu__list'}>
        <ListItem>
          <MenuHeader />
        </ListItem>

        <Divider />

        <Box className="menu__nav-container">
          <MenuItem open={false} name="Расписание" to="/schedule">
            <CalendarTodayIcon className="menu--svg" />
          </MenuItem>
          <MenuItem open={false} name="Ученики" to="/pupils">
            <FaceIcon className="menu--svg" />
          </MenuItem>
          {business && (
            <MenuItem open={false} name="Финансы" to="/finance">
              <ShowChartIcon className="menu--svg" />
            </MenuItem>
          )}
          {/* <MenuItem open={false} name="Домашняя работа" to="/homework">
            <FaceIcon className="menu--svg" />
          </MenuItem> */}
        </Box>
      </List>
    </Drawer>
  );
}

export default MenuLgDrawer;
