import React from 'react';
import { FieldArray, useField, useFormikContext } from 'formik';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const menuProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  getContentAnchorEl: null,
};

const iconComponent = (props) => <ExpandMoreIcon {...props} />;

const days = {
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота',
  7: 'Воскресенье',
};

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

const MySelect = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <Select {...field} {...props} error={meta.touched && Boolean(meta.error)} />
      {meta.touched && meta.error ? (
        <span className="pupil-form__select-error">{meta.error}</span>
      ) : null}
    </React.Fragment>
  );
};

function AddScheduleInputs() {
  const { values } = useFormikContext();

  return (
    <FieldArray name="schedules">
      {({ insert, remove, push }) => (
        <React.Fragment>
          {values.schedules.length > 0 &&
            values.schedules.map((schedule, index) => (
              <React.Fragment key={index}>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="pupil-form__select-label">День занятия</InputLabel>
                      <MySelect
                        labelId="pupil-form__select-label"
                        name={`schedules[${index}].day`}
                        MenuProps={menuProps}
                        IconComponent={iconComponent}>
                        {Object.keys(days).map((key) => (
                          <MenuItem key={key} value={key}>
                            {days[key]}
                          </MenuItem>
                        ))}
                      </MySelect>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <MyTextField
                      margin="none"
                      name={`schedules[${index}].time`}
                      type="time"
                      label="Время занятия"
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <MyTextField
                  margin="normal"
                  name={`schedules[${index}].price`}
                  label="Стоимость занятия, 800"
                  autoComplete="off"
                  fullWidth
                />
                <MyTextField
                  margin="normal"
                  name={`schedules[${index}].subject`}
                  label="Предмет"
                  autoComplete="off"
                  fullWidth
                />
                {values.schedules.length > 1 && (
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
          <Tooltip title="Добавить номер">
            <IconButton
              size="small"
              color="secondary"
              aria-label="Добавить номер"
              className="pupil-form__btn pupil-form__btn-add-contact"
              onClick={() => push({ day: '', price: '', subject: '', time: '15:00' })}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      )}
    </FieldArray>
  );
}

export default AddScheduleInputs;
