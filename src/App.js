import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import theme from './stylesOverride';

import { Menu, InfoPanel } from './components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import React from 'react';
import Schedule from './pages/Schedule';
import Pupils from './pages/Pupils';
import Finance from './pages/Finance';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchLessons } from './redux/actions/lessons';
import { fetchPupils } from './redux/actions/pupils';
import { fetchSchedules } from './redux/actions/schedules';
import { fetchScheduledLessons } from './redux/actions/scheduledLessons';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchLessons(new Date()));
    dispatch(fetchScheduledLessons(new Date()));
    dispatch(fetchPupils());
    dispatch(fetchSchedules());
  }, []);

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="App">
          <CssBaseline />
          <Menu />
          <Box className="content">
            <Container maxWidth="xl">
              <InfoPanel />
              <Switch>
                <Route exact path="/tutor">
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
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
