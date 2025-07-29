import { Grid, Typography } from '@mui/material';

export default function SectionHeader({
  title = 'Global Health Funding – By Development Assistance Committee (DAC) Countries (2019 – 2023)',
  subTitle = 'As of 2023, the US remained the world’s largest bilateral contributor to global health, reinforcing its pivotal funding role',
}: {
  title?: string;
  subTitle?: string;
}) {
  return (
    <Grid py={4} display="flex" flexDirection="column" gap={1}>
      <Typography variant="h5" fontWeight={700}>
        {title}
      </Typography>
      <Typography variant="h6" fontWeight={500} mt={1}>
        {subTitle}
      </Typography>
    </Grid>
  );
}
