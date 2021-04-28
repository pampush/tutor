import React from 'react';
import { useField } from 'formik';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Checkbox } from '@material-ui/core';

export const MyTextField = ({ ...props }) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export const MyCheckBox = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <Checkbox {...field} {...props} />
    </React.Fragment>
  );
};

export const MySelect = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <Select {...field} {...props} error={meta.touched && Boolean(meta.error)} />
      {meta.touched && meta.error ? (
        <span className="lesson-form__select-error">{meta.error}</span>
      ) : null}
    </React.Fragment>
  );
};
