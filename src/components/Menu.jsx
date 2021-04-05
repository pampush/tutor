import React from 'react';
import Hidden from '@material-ui/core/Hidden';

import MenuDrawer from './Menu/MenuLgDrawer';
import MenuDrawerMobile from './Menu/MenuSmDrawer';
import MenuMdDrawer from './Menu/MenuMdDrawer';

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
