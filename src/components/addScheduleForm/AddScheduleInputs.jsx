import React from 'react';

import { Grid, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { MyTextField, MySelect } from '../CustomInputs';

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

const days = {
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота',
  7: 'Воскресенье',
};

const iconComponent = (props) => <ExpandMoreIcon {...props} />;

function AddScheduleInputs() {
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <MyTextField
            margin="none"
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
        type="number"
        label="Стоимость занятия"
        autoComplete="off"
        fullWidth
      />
      <MyTextField margin="normal" name="subject" label="Предмет" autoComplete="off" fullWidth />
    </React.Fragment>
  );
}

export default AddScheduleInputs;
