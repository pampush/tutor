import React from 'react';
import { useField, FieldArray, useFormikContext } from 'formik';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

function MyTextField({ ...props }) {
  const [field, meta, helpers] = useField(props.name);
  return (
    <TextField
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
}

function AddPupilForm() {
  const { values } = useFormikContext();

  return (
    <React.Fragment>
      <MyTextField autoFocus margin="normal" name="name" label="Имя" autoComplete="off" fullWidth />
      <MyTextField margin="normal" name="grade" label="Класс" autoComplete="off" fullWidth />
      <MyTextField margin="normal" name="address" label="Адрес" autoComplete="off" fullWidth />
      <MyTextField margin="normal" name="parents" label="Родитель" autoComplete="off" fullWidth />

      <FieldArray name="contacts">
        {({ insert, remove, push }) => (
          <React.Fragment>
            {values.contacts.length > 0 &&
              values.contacts.map((contact, index) => (
                <React.Fragment>
                  <MyTextField
                    margin="normal"
                    name={`contacts[${index}]`}
                    label="Контакты"
                    autoComplete="off"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+7</InputAdornment>,
                    }}
                    fullWidth
                  />
                  <Button
                    type="button"
                    variant="contained"
                    color="secondary"
                    onClick={() => remove(index)}>
                    X
                  </Button>
                </React.Fragment>
              ))}
            <Button type="button" variant="contained" color="secondary" onClick={() => push('')}>
              Add Friend
            </Button>
          </React.Fragment>
        )}
      </FieldArray>
    </React.Fragment>
  );
}

export default AddPupilForm;
