import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="h6">Loading...</Typography>
    </Box>
  );
}
