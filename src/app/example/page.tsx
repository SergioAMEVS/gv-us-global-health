'use client';

import { Box, Button, Grid, Typography } from '@mui/material';
import { useArticles, useCounterStore } from '@/hooks';
import { type StatePopulation } from '@/types/articles';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function Example() {
  const { count, increment, decrement, reset } = useCounterStore();
  const { articles, iframeUrls, isLoading, isError } = useArticles();

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

      {isLoading && (
        <Typography variant="body1" mt={4}>
          Loading articles...
        </Typography>
      )}

      {isError && (
        <Typography variant="body1" mt={4} color="error">
          Error loading articles. Please try again later.
        </Typography>
      )}

      {!isLoading && !isError && (
        <Grid container spacing={2}>
          {articles.map((article: StatePopulation, idx: number) => (
            <Box key={idx} width="100%" mt={4}>
              <Typography variant="h6">
                {article.state_name} ({article.year})
              </Typography>
              <Typography variant="body2">Población: {article.population}</Typography>
              {iframeUrls[idx] && (
                <Box mt={2} width="100%">
                  <iframe
                    src={iframeUrls[idx]}
                    width="100%"
                    height="600px"
                    style={{ border: 'none' }}
                    title={`Embedded Content ${idx}`}
                  />
                </Box>
              )}
            </Box>
          ))}
        </Grid>
      )}

      <p>Here</p>
      <Box mt={4} width="100%">
        <iframe
          src={`${basePath}/table_content.html`}
          width="100%"
          height="2900px"
          style={{ border: 'none' }}
          title="Embedded Content"
        ></iframe>
      </Box>
    </Grid>
  );
}
