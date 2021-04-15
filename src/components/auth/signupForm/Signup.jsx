import React from 'react';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router';

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
import ErrorSnack from './ErrorSnack';
//import signup from '../../../redux/actions/signup';

function Signup() {
  //const dispatch = useDispatch();
  const history = useHistory();
  const { signup } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [viewSnack, setViewSnack] = React.useState(false);

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    setLoading(true);
    try {
      await signup(values.email, values.password);
      history.push('/tutor');
    } catch (e) {
      setViewSnack(true);
      setLoading(false);
      setError('Не удалось создать аккаунт');
    }
    //dispatch(signup(values.email, values.password));
  };

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
        <Form>
          <SignupInputs />

          <Button
            type="submit"
            disabled={loading}
            fullWidth
            variant="contained"
            color="secondary"
            className="signup__submit">
            Зарегистрироваться
          </Button>
          {/* <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Уже есть аккаунт? Войти
                </Link>
              </Grid>
            </Grid> */}
        </Form>
      </Formik>
      <Box mt={5}>copyrigth</Box>
    </Container>
  );
}

export default Signup;
