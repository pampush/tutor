import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { ReactComponent as NonFoundIcon } from '../assets/img/notfound.svg';

function NotFound() {
  return (
    <Box className="notfound__container">
      <NonFoundIcon className="notfound__svg" />
      <Typography variant="h2" align="center">
        404
      </Typography>
      <Typography variant="h3" align="center">
        Страница не найдена
      </Typography>

      <Button size="large" variant="contained" color="secondary" component={Link} to="/schedule">
        Домой
      </Button>
    </Box>
  );
}

export default NotFound;
