import React from 'react';
import Hidden from '@material-ui/core/Hidden';

import MenuBar from './MenuBar';
import MenuDrawer from './MenuDrawer';
import MenuDrawerMobile from './MenuDrawerMobile';

const Header = () => {
  const [drawer, setDrawer] = React.useState(false);

  function handleDrawerOpen() {
    setDrawer((prev) => !prev);
  }
  return (
    <React.Fragment>
      <Hidden smUp>
        <MenuBar handleDrawerOpen={handleDrawerOpen} />
        <MenuDrawerMobile open={drawer} handleDrawerOpen={handleDrawerOpen}/>
      </Hidden>

      <Hidden xsDown>
        <MenuDrawer open={drawer} handleDrawerOpen={handleDrawerOpen}/>
      </Hidden>
    </React.Fragment>
  );
};

export default Header;
