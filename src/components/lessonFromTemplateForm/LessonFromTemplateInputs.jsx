import React from 'react';

import { MyTextField } from '../CustomInputs';

const LessonFromTemplateInputs = () => {
  return (
    <React.Fragment>
      <MyTextField margin="normal" name="theme" label="Тема" autoComplete="off" fullWidth />
      <MyTextField margin="normal" name="note" label="Заметки" autoComplete="off" fullWidth />
    </React.Fragment>
  );
};

export default LessonFromTemplateInputs;
