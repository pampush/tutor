import React from 'react';
import { useField } from 'formik';
import { useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

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

const MyTextField = ({ ...props }) => {
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

const MySelect = ({ ...props }) => {
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
      </Grid>
    </React.Fragment>
  );
}
