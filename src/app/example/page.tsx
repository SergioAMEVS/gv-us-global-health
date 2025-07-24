'use client';

import { Grid } from '@mui/material';
import AccordionDrawer from '@/components/common/AccordionDrawer';

export default function Example() {
  const accordionSummary =
    'Top 10 Donor Countries to International Health Assistance as a Share of Total Assistance (2023)';
  const accordionContent = 'Content Here'; // Could be a component

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
        <AccordionDrawer panelId="test" summary={accordionSummary}>
          {accordionContent}
        </AccordionDrawer>
      </Grid>
    </Grid>
  );
}
