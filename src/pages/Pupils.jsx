import React from 'react';

import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { PupilsList } from '../components';

function Pupils() {
  const [anchorNewLesson, setAnchorNewLesson] = React.useState(null);

  function handleNewLessonClick(e) {
    setAnchorNewLesson(e.currentTarget);
  }

  return (
    <React.Fragment>
      <Container maxWidth="xl" className="pupils__container">
        <PupilsList anchor={anchorNewLesson} handleClick={handleNewLessonClick}/>
      </Container>
    </React.Fragment>
  );
}

export default Pupils;
