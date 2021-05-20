import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import theme from "./stylesOverride";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import StylesProvider from "@material-ui/styles/StylesProvider";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import { Menu, InfoPanel, Signup, Login, NotFound } from "./components";
import Schedule from "./pages/Schedule";
import Pupils from "./pages/Pupils";
import Finance from "./pages/Finance";
import Settings from "./pages/Settings";
import HomeworkList from "./pages/HomeworkList";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PrivateRoute from "./PrivateRoute";
import PrivateSignedInRoute from "./PrivateSignedInRoute";
import { AuthContext } from "./contexts/AuthContext";

import { fetchLessons } from "./redux/actions/lessons";
import { fetchPupils } from "./redux/actions/pupils";
import { fetchSchedules } from "./redux/actions/schedules";
import { fetchScheduledLessons } from "./redux/actions/scheduledLessons";
import { fetchUser } from "./redux/actions/user";
import { setDate } from "./redux/actions/date";
import LessonHomework from "./pages/LessonHomework";

function Content() {
  const dispatch = useDispatch();
  const { currentUser } = React.useContext(AuthContext);
  const business = useSelector(({ user }) => user.business);

  React.useEffect(() => {
    dispatch(setDate(new Date()));
    dispatch(fetchLessons(new Date()));
    dispatch(fetchScheduledLessons(new Date()));
    dispatch(fetchPupils());
    dispatch(fetchSchedules());
    dispatch(fetchUser(currentUser.uid));
  }, [currentUser]);

  return (
    <React.Fragment>
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
            <Route path="/finance">{business && <Finance />}</Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/homework/:storageId/:pupil/:date">
              <LessonHomework currentUser={currentUser} />
            </Route>
            <Route path="/homework/:storageId/:pupil">
              <HomeworkList currentUser={currentUser} />
            </Route>
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </Container>
      </Box>
    </React.Fragment>
  );
}

function App() {
  const { currentUser } = React.useContext(AuthContext);

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route path="/404">
            <NotFound />
          </Route>
          <PrivateSignedInRoute path="/signup" component={Signup} />
          <PrivateSignedInRoute path="/login" component={Login} />

          {!currentUser && (
            <Route path="/homework/:storageId/:pupil">
              <HomeworkList />
            </Route>
          )}
          <Route path="/privacy">
            <PrivacyPolicy />
          </Route>
          <PrivateRoute path="/:page" component={Content} />
          <PrivateRoute exact path="/" component={Content} />
        </Switch>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
