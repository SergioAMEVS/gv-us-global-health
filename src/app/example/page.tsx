'use client';

import useCounterStore from '@/lib/store/useStore';
import { Button, Grid, Typography } from '@mui/material';

export default function Example() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid>
        <Typography variant="h6">Zustand example</Typography>
        <Typography variant="body1">
          This is a example how we can use Zustand to handle state
        </Typography>

        <Typography variant="body1">Contador: {count}</Typography>
        <Button onClick={increment} variant="contained" color="primary">
          Incrementar
        </Button>
        <Button onClick={decrement} variant="contained" color="secondary">
          Decrementar
        </Button>
        <Button onClick={reset} variant="outlined">
          Resetear
        </Button>
      </Grid>
      <Grid mt={2}>Welcome to GV!</Grid>
    </Grid>
  );
}
