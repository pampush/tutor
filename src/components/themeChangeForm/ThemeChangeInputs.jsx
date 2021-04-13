import React from 'react';
import { useField } from 'formik';

import TextField from '@material-ui/core/TextField';

const MyTextField = ({ ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

const ThemeChangeInputs = () => {
  return <MyTextField margin="normal" name="theme" label="Тема" autoComplete="off" fullWidth />;
};

export default ThemeChangeInputs;
