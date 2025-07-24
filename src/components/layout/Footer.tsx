'use client';
import { Box, Grid, Typography } from '@mui/material';
import NextSeccionButton from './NextSeccionButton';
import BackToTopButton from './BackToTopButton';

export default function Footer() {
  return (
    <footer style={{ textAlign: 'center' }}>
      <Box bgcolor={'primary.bgFooter'} py={2}>
        <Grid ml={3} display="flex" justifyContent="space-between" alignItems="center">
          <Grid display="flex" flexDirection="column" gap={2} justifyContent={'start'}>
            <Typography color={'#000000DE'} fontWeight={500} textAlign="left" fontSize={14}>
              Continue Reading
            </Typography>
            <NextSeccionButton />
          </Grid>
          <Grid mr={3}>
            <BackToTopButton />
          </Grid>
        </Grid>
      </Box>
      <Box
        bgcolor={'#CDD7E1'}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        <Grid ml={3}>
          <Grid display="flex" flexDirection="column" justifyContent={'start'}>
            <Typography color={'#000000DE'} fontWeight={500} textAlign="left" fontSize={14}>
              US Health Funds: Allocation Trends & Recent Cuts
            </Typography>
            <Typography color={'#000000DE'} fontWeight={400} textAlign="left" fontSize={12}>
              ©2025 Gates Ventures. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </footer>
  );
}
