'use client';

import { Grid } from '@mui/material';

export default function Example2() {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid mt={2}>Welcome to GV!</Grid>
    </Grid>
  );
}
