import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import theme from './stylesOverride';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import StylesProvider from '@material-ui/styles/StylesProvider';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { Menu, InfoPanel, Signup, Login } from './components';
import Schedule from './pages/Schedule';
import Pupils from './pages/Pupils';
import Finance from './pages/Finance';
import PrivateRoute from './PrivateRoute';

import { fetchLessons } from './redux/actions/lessons';
import { fetchPupils } from './redux/actions/pupils';
import { fetchSchedules } from './redux/actions/schedules';
import { fetchScheduledLessons } from './redux/actions/scheduledLessons';

function Content() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchLessons(new Date()));
    dispatch(fetchScheduledLessons(new Date()));
    dispatch(fetchPupils());
    dispatch(fetchSchedules());
  }, []);

  return (
    <div>
      <Menu />
      <Box className="content">
        <Container maxWidth="xl">
          <InfoPanel />
          <Switch>
            <Route path={`/tutor`}>
              <Schedule />
            </Route>
            <Route path="/schedule">
              <Schedule />
            </Route>
            <Route path="/pupils">
              <Pupils />
            </Route>
            <Route path="/finance">
              <Finance />
            </Route>
          </Switch>
        </Container>
      </Box>
    </div>
  );
}

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/:page" component={Content}></PrivateRoute>
          <Route path="*">
            <div>404</div>
          </Route>
        </Switch>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
