import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

import { Menu, InfoPanel } from './components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Schedule from './pages/Schedule';
import Pupils from './pages/Pupils';
import Finance from './pages/Finance';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React from 'react';

import { fetchLessons } from './redux/actions/lessons';
import { fetchPupils } from './redux/actions/pupils';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: orange[500],
    },
    text: {
      primary: '#000000',
      secondary: '#9E9E9E',
    },
  },
  typography: {
    body1: { fontSize: '1.3rem' },
  },

  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#F5F5F5',
      },
    },
    MuiButton: {
      label: { color: '#ffffff' },
      // iconSizeMedium: {
      //   '& > *:first-child': {
      //     fontSize: '24px',
      //   },
      // },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'rgba(255, 192, 70, 0.5)',
        },
      },
    },
  },
});

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchLessons(new Date()));
    dispatch(fetchPupils());
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
                <Route exact path="/">
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
