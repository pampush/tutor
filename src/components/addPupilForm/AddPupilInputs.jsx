import React from 'react';
import { useField, FieldArray, useFormikContext } from 'formik';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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

function AddPupilInputs() {
  const { values } = useFormikContext();

  return (
    <React.Fragment>
      <MyTextField autoFocus margin="normal" name="name" label="Имя" autoComplete="off" fullWidth />
      <MyTextField
        margin="normal"
        name="grade"
        label="Класс"
        type="number"
        InputProps={{
          inputProps: { min: 1, max: 20 },
        }}
        autoComplete="off"
        fullWidth
      />
      <MyTextField margin="normal" name="address" label="Адрес" autoComplete="off" fullWidth />
      <MyTextField margin="normal" name="parents" label="Родитель" autoComplete="off" fullWidth />

      <FieldArray name="contacts">
        {({ insert, remove, push }) => (
          <React.Fragment>
            {values.contacts.length > 0 &&
              values.contacts.map((contact, index) => (
                <React.Fragment key={index}>
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
                  {/*FIXME: iconbutton hover transparency on mobile screen*/}
                  <Tooltip title="Удалить номер">
                    <IconButton
                      size="small"
                      aria-label="Удалить номер"
                      className="pupil-form__btn"
                      color="secondary"
                      onClick={() => remove(index)}>
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </React.Fragment>
              ))}
            <Tooltip title="Добавить номер">
              <IconButton
                size="small"
                color="secondary"
                aria-label="Добавить номер"
                className="pupil-form__btn pupil-form__btn-add-contact"
                onClick={() => push('')}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        )}
      </FieldArray>
    </React.Fragment>
  );
}

export default AddPupilInputs;
