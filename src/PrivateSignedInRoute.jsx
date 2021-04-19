/**
 * push from login/signup if signed in
 */

import React from 'react';
import { Route, Redirect } from 'react-router';

import { AuthContext } from './contexts/AuthContext';

function PrivateSignedInRoute({ component: Component, ...rest }) {
  const { currentUser } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser && currentUser.emailVerified ? (
          <Redirect to="/schedule" />
          ) : (
          <Component {...props} />
        );
      }}></Route>
  );
}

export default PrivateSignedInRoute;
