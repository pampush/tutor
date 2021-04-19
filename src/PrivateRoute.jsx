/**
 * push from content pages if not signed in
 */

import React from 'react';
import { Route, Redirect } from 'react-router';

import { AuthContext } from './contexts/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser && currentUser.emailVerified ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}></Route>
  );
}

export default PrivateRoute;
