import React from 'react';

import { MyTextField } from '../CustomInputs';

function ThemeFormInputs() {
  return (
    <React.Fragment>
      <MyTextField
        margin="normal"
        name="theme"
        label="Тема"
        autoComplete="off"
        multiline
        fullWidth
      />
    </React.Fragment>
  );
}

export default ThemeFormInputs;