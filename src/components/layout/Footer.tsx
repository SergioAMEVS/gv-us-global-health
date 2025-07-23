'use client';
import { Box, Grid, Typography } from '@mui/material';
import NextSeccionButton from './NextSeccionButton';
import BackToTopButton from './BackToTopButton';

export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#F0F4F8' }}>
      <Box
        bgcolor={'primary.bgFooter'}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        ml={3}
      >
        <Grid display="flex" flexDirection="column" gap={2} justifyContent={'start'}>
          <Typography color={'#000000DE'} fontWeight={500} textAlign="left" fontSize={14}>
            Continue Reading
          </Typography>
          <NextSeccionButton />
        </Grid>
        <Grid mr={3}>
          <BackToTopButton />
        </Grid>
      </Box>
    </footer>
  );
}
