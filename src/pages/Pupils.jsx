import React from 'react';

import Container from '@material-ui/core/Container';

import { PupilsList } from '../components';

function Pupils() {
  return (
    <React.Fragment>
      <Container maxWidth="xl" className="pupils__container">
        <PupilsList />
      </Container>
    </React.Fragment>
  );
}

export default Pupils;
