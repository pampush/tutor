import React from 'react';
import * as yup from 'yup';
import { useFormik, useField } from 'formik';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  return <Select {...field} {...props} error={meta.touched && Boolean(meta.errors)} />;
};

function AddScheduleForm() {
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="pupil-form__select-label">День занятия</InputLabel>
            <MySelect
              labelId="pupil-form__select-label"
              name="day"
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
            id="time"
            name="time"
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
        name="price"
        label="Стоимость занятия, 800"
        autoComplete="off"
        fullWidth
      />
      <MyTextField margin="normal" name="subject" label="Предмет" autoComplete="off" fullWidth />
    </React.Fragment>
  );
}

export default AddScheduleForm;
