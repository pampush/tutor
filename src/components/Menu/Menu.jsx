import React from 'react';
import Hidden from '@material-ui/core/Hidden';

import MenuDrawer from './MenuLgDrawer';
import MenuDrawerMobile from './MenuSmDrawer';
import MenuMdDrawer from './MenuMdDrawer';

const Menu = () => {
  return (
    <React.Fragment>
      <Hidden smUp>
        <MenuDrawerMobile />
      </Hidden>
      <Hidden only={['xs', 'lg', 'xl']}>
        <MenuMdDrawer />
      </Hidden>
      <Hidden mdDown>
        <MenuDrawer />
      </Hidden>
    </React.Fragment>
  );
};

export default Menu;
