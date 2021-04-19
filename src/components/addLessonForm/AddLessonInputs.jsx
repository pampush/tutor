import React from 'react';
import { useSelector } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

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

const iconComponent = (props) => <ExpandMoreIcon {...props} />;

export default function AddLessonInputs() {
  const pupils = useSelector(({ pupils }) => pupils.items);

  return (
    <React.Fragment>
      <MyTextField margin="normal" name="theme" label="Тема" autoComplete="off" fullWidth />
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="lesson-form__select-label">Ученик</InputLabel>
            <MySelect
              labelId="lesson-form__select-label"
              name="pupil"
              MenuProps={menuProps}
              IconComponent={iconComponent}>
              {Object.keys(pupils).map((key) => (
                <MenuItem key={key} value={pupils[key].id}>
                  {pupils[key].name}
                </MenuItem>
              ))}
            </MySelect>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <MyTextField margin="none" name="subject" label="Предмет" autoComplete="off" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <MyTextField
            margin="normal"
            name="date"
            label="Дата"
            type="date"
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <MyTextField
            margin="normal"
            name="time"
            label="Время урока"
            type="time"
            inputProps={{
              step: 300, // 5 min
            }}
            autoComplete="off"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <MyTextField
            margin="none"
            multiline={true}
            rowsMax={10}
            name="note"
            label="Заметки"
            autoComplete="off"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
