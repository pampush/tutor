import React from 'react';
import { FieldArray, useFormikContext } from 'formik';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { MyTextField, MySelect } from '../CustomInputs';
import { useSelector } from 'react-redux';

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

function AddScheduleInputs() {
  const business = useSelector(({ user }) => user.business);
  const { values } = useFormikContext();
  return (
    <FieldArray name="schedules">
      {({ insert, remove, push }) => (
        <React.Fragment>
          {values.schedules.length > 0 &&
            values.schedules.map((schedule, index) => (
              <React.Fragment key={index}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="pupil-form__select-label">День занятия*</InputLabel>
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
                  <Grid item xs={12} sm={6}>
                    <MyTextField
                      margin="none"
                      name={`schedules[${index}].time`}
                      type="time"
                      label="Время занятия*"
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                {business && (
                  <MyTextField
                    margin="normal"
                    name={`schedules[${index}].price`}
                    type="number"
                    label="Стоимость занятия*"
                    autoComplete="off"
                    fullWidth
                  />
                )}
                <MyTextField
                  margin="normal"
                  name={`schedules[${index}].subject`}
                  label="Предмет*"
                  autoComplete="off"
                  fullWidth
                />
                {values.schedules.length > 1 && (
                  <Tooltip title="Удалить расписание">
                    <IconButton
                      size="small"
                      aria-label="Удалить расписание"
                      className="pupil-form__btn"
                      color="secondary"
                      onClick={() => remove(index)}>
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </React.Fragment>
            ))}
          <Tooltip title="Добавить расписание">
            <IconButton
              size="small"
              color="secondary"
              aria-label="Добавить расписание"
              className="pupil-form__btn pupil-form__btn-add-contact"
              onClick={() => push({ day: '', price: 0, subject: '', time: '15:00' })}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      )}
    </FieldArray>
  );
}

export default AddScheduleInputs;
