import React from 'react';
import { useField, FieldArray, useFormikContext } from 'formik';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

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
