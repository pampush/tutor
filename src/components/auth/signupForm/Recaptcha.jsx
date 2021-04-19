import React from 'react';
import firebase from 'firebase/app';
import { useFormikContext } from 'formik';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Recaptcha() {
  const { errors, setFieldTouched, setFieldValue, touched } = useFormikContext();
  React.useEffect(() => {
    let recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
      size: 'normal',
      callback: (response) => {
        setFieldTouched('recaptcha', true);
        setFieldValue('recaptcha', response);
      },
      'expired-callback': () => {
        setFieldValue('recaptcha', '');
      },
    });

    recaptchaVerifier.render().then((widgetId) => (recaptchaVerifier = widgetId));
  }, []);

  return (
    <React.Fragment>
      <Box id="recaptcha" mt={2} mb={2} />
      {errors.recaptcha && touched.recaptcha && (
        <Typography color="error">{errors.recaptcha}</Typography>
      )}
      <input type="hidden" name="recaptcha"></input>
    </React.Fragment>
  );
}

export default Recaptcha;
