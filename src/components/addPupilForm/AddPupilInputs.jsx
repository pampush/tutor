import React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { MyTextField } from '../CustomInputs';

function AddPupilInputs() {
  const { values } = useFormikContext();

  return (
    <React.Fragment>
      <MyTextField
        autoFocus
        margin="normal"
        name="name"
        label="Имя*"
        autoComplete="off"
        fullWidth
      />
      <MyTextField
        margin="normal"
        name="grade"
        label="Класс*"
        type="number"
        InputProps={{
          inputProps: { min: 1, max: 20 },
        }}
        autoComplete="off"
        fullWidth
      />
      <MyTextField margin="normal" name="address" label="Адрес" autoComplete="off" fullWidth />

      <FieldArray name="parents">
        {({ insert, remove, push }) => (
          <React.Fragment>
            {values.parents.length > 0 &&
              values.parents.map((contact, index) => (
                <React.Fragment key={index}>
                  <MyTextField
                    margin="normal"
                    name={`parents[${index}].person`}
                    label="Родитель"
                    autoComplete="off"
                    fullWidth
                  />

                  <MyTextField
                    margin="normal"
                    name={`parents[${index}].contact`}
                    label="Контакты"
                    autoComplete="off"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+7</InputAdornment>,
                    }}
                    fullWidth
                  />

                  {values.parents.length > 1 && (
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
                  )}
                </React.Fragment>
              ))}
            {values.parents.length < 5 && (
              <Tooltip title="Добавить номер">
                <IconButton
                  size="small"
                  color="secondary"
                  aria-label="Добавить номер"
                  className="pupil-form__btn pupil-form__btn-add-contact"
                  onClick={() => push({ person: '', contact: '' })}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            )}
          </React.Fragment>
        )}
      </FieldArray>
    </React.Fragment>
  );
}

export default AddPupilInputs;
