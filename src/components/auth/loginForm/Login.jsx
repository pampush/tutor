import React from 'react';
import { Formik, Form } from 'formik';
import { useHistory, Link } from 'react-router-dom';

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
import LoginInputs from './LoginInputs';
import { AuthContext } from '../../../contexts/AuthContext';
import ErrorSnack from '../ErrorSnack';
import Footer from '../Footer';

function Login() {
  const history = useHistory();
  const { login } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [viewErrorSnack, setViewErrorSnack] = React.useState(false);

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    setLoading(true);
    try {
      await login(values.email, values.password);
      history.push('/tutor');
    } catch (e) {
      switch (e.code) {
        case 'auth/user-not-found': {
          setError('Пользователя с таким email не существует');
          break;
        }
        case 'auth/wrong-password': {
          setError('Неверный пароль');
          break;
        }
        case 'auth/too-many-requests': {
          setError('Слишком много попыток войти. Попробуйте снова через пять минут');
          break;
        }
        default:
          break;
      }

      setViewErrorSnack(true);
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  return (
    <Container component="main" maxWidth="sm" className="auth__main">
      {error && <ErrorSnack open={viewErrorSnack} message={error} onClose={setViewErrorSnack} />}
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
              Вход в личный кабинет
            </Typography>
          </Grid>
        </Grid>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ values }) => (
            <Form>
              <LoginInputs />

              <Button
                type="submit"
                disabled={loading}
                fullWidth
                variant="contained"
                color="secondary"
                className="auth__submit">
                Вход
              </Button>
            </Form>
          )}
        </Formik>
        <Box mt={5}>
          У вас нет учетной записи? <Link to="/signup">Зарегистрироваться</Link>
        </Box>
      </Grid>
      <Footer />
    </Container>
  );
}

export default Login;
