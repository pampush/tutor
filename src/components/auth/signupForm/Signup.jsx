import React from 'react';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
import EmailSnack from '../EmailSnack';
import { postUser } from '../../../redux/actions/user';
import Footer from '../Footer';
import { Link } from '@material-ui/core';

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { signup, verifyEmail, updateUser } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [viewSnack, setViewSnack] = React.useState(false);
  const [viewEmailVerifySnack, setViewEmailVerifySnack] = React.useState(false);

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    setLoading(true);

    try {
      const name = values.firstName + ' ' + values.lastName;
      const userCredential = await signup(values.email, values.password);
      await updateUser(name);
      await verifyEmail(userCredential.user);

      setViewEmailVerifySnack(true);

      dispatch(
        postUser({
          id: userCredential.user.uid,
          name,
          timestamp: Date.now(),
          email: userCredential.user.email,
          business: values.business,
        }),
      );

      setTimeout(() => history.push('/login'), 3000);
    } catch (e) {
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
    <React.Fragment>
      <EmailSnack
        open={viewEmailVerifySnack}
        message={
          'Спасибо! Мы отправили вам письмо на указанный email с ссылкой для подтверждения регистрации.'
        }
        onClose={() => setViewEmailVerifySnack(false)}
      />
      <Container component="main" maxWidth="sm" className="auth__main">
        <ErrorSnack open={viewSnack} message={error} onClose={setViewSnack} />
        <CssBaseline />
        <Grid container className="auth__container">
          <Grid
            container
            direction="column"
            alignItems="center"
            spacing={1}
            className="auth__header-container">
            <Grid item>
              <Avatar className="auth__avatar">
                <LockOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h5" className="auth__header-title">
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
                <Typography>
                  Нажимая на кнопку "Зарегистрироваться" вы соглашаетесь с
                  <Link> Условиями использования </Link> и<Link>Политикой конфиденциальности </Link>
                </Typography>
                <Button
                  type="submit"
                  disabled={loading}
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className="auth__submit">
                  Зарегистрироваться
                </Button>
              </Form>
            )}
          </Formik>
          <Box mt={5}>
            <RouterLink to="/login">Войти в аккаунт</RouterLink>
          </Box>
        </Grid>
        <Footer />
      </Container>
    </React.Fragment>
  );
}

export default Signup;
