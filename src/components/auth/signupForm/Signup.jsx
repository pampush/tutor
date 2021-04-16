import React from 'react';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import initialValues from './initialValues';
import validationSchema from './validationSchema';
import SignupInputs from './SignupInputs';
import { AuthContext } from '../../../contexts/AuthContext';
import ErrorSnack from '../ErrorSnack';
import Recaptcha from './Recaptcha';

import { postUser } from '../../../redux/actions/users';
//import signup from '../../../redux/actions/signup';

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, signup, verifyEmail, updateUser } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [viewSnack, setViewSnack] = React.useState(false);

  console.log(`signup auth`, currentUser);
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    setLoading(true);
    try {
      const name = values.firstName + ' ' + values.lastName;
      const userCredential = await signup(values.email, values.password);
      await updateUser(name);
      await verifyEmail();

      // FIXME: don't know how to handle async func with dynamic
      // currentUser state so decided to use global auth variable
      dispatch(postUser({ id: userCredential.user.uid, name, timestamp: Date.now() }));
      history.push('/login');
    } catch (e) {
      console.log(e);
      switch (e.code) {
        case 'auth/email-already-in-use': {
          setError('Почта уже используется');
          break;
        }
        default:
          break;
      }
      setViewSnack(true);
    }
    //dispatch(signup(values.email, values.password));
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  return (
    <Container component="main" maxWidth="sm" className="signup__main">
      {error && <ErrorSnack open={viewSnack} message={error} onClose={setViewSnack} />}
      <CssBaseline />
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={1}
        className="signup__header-container">
        <Grid item>
          <Avatar className="signup__avatar">
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography component="h1" variant="h5" className="signup__header-title">
            Регистрация
          </Typography>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ setFieldValue, errors, touched }) => (
          <Form>
            <SignupInputs />
            <Recaptcha />
            <Button
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              color="secondary"
              className="signup__submit">
              Зарегистрироваться
            </Button>
          </Form>
        )}
      </Formik>
      <Box mt={5}>copyrigth</Box>
    </Container>
  );
}

export default Signup;
