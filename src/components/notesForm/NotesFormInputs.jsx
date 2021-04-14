import React from 'react';

import { MyTextField } from '../CustomInputs';

function NotesFormInputs() {
  return (
    <React.Fragment>
      <MyTextField margin="normal" name="note" label="Заметки" autoComplete="off" fullWidth />
    </React.Fragment>
  );
}

export default NotesFormInputs;
