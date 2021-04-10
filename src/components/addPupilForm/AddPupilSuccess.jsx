import React from 'react';

import Typography from '@material-ui/core/Typography';

function AddPupilSuccess() {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Успешно
      </Typography>
      <Typography variant="subtitle1">Новый ученик добавлен</Typography>
    </React.Fragment>
  );
}

export default AddPupilSuccess;
