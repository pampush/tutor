import React from 'react';
import Link from '@material-ui/core/Link';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function Footer({ width }) {
  return (
    <Box mb={2} mt={4}>
      <Typography variant={isWidthDown('md', width) ? 'body2' : 'body1'} align="center">
        🍪 2021{' '}
        <Link href="https://github.com/pampush" target="_blank">
          github.com/pampush
        </Link>
      </Typography>
    </Box>
  );
}

export default withWidth()(Footer);
