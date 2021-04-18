import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
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
import { fetchUser } from '../../../redux/actions/user';
import ErrorSnack from '../ErrorSnack';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { login, setFirstLogin } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [viewSnack, setViewSnack] = React.useState(false);

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    setLoading(true);
    try {
      await login(values.email, values.password);

      //dispatch(fetchUser(userCredential.user.uid));
      history.push('/tutor');
    } catch (e) {
      console.log(e);
      switch (e.code) {
        case 'auth/user-not-found': {
          setError('Неправильная почта');
          break;
        }
        case 'auth/wrong-password': {
          setError('Неправильный пароль');
          break;
        }
        case 'auth/too-many-requests': {
          setError('Слишком много попыток войти. Попробуйте снова через пять минут');
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
            Вход в личный кабинет
          </Typography>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form>
          <LoginInputs />

          <Button
            type="submit"
            disabled={loading}
            fullWidth
            variant="contained"
            color="secondary"
            className="signup__submit">
            Вход
          </Button>
        </Form>
      </Formik>
      <Box mt={5}>
        У вас нет учетной записи? <Link to="/signup">Зарегистрироваться</Link>
      </Box>
    </Container>
  );
}

export default Login;