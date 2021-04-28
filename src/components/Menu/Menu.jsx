import React from 'react';
import Hidden from '@material-ui/core/Hidden';

import MenuLgDrawer from './MenuLgDrawer';
import MenuMdDrawer from './MenuMdDrawer';
import MenuSmDrawer from './MenuSmDrawer';

const Menu = () => {
  return (
    <React.Fragment>
      <Hidden smUp>
        <MenuSmDrawer />
      </Hidden>
      <Hidden only={['xs', 'lg', 'xl']}>
        <MenuMdDrawer />
      </Hidden>
      <Hidden mdDown>
        <MenuLgDrawer />
      </Hidden>
    </React.Fragment>
  );
};

export default Menu;
