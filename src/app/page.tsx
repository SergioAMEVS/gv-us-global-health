'use client';

import { Grid } from '@mui/material';
import SectionHeader from '@/components/common/SectionHeader';
import WorldMap from '@/components/maps/WordMap';
import DonorCountriesAccordion from '@/components/globalHealthFunding/DonorCountriesAccordion';
import { mapData } from '@/data/mapData';

export default function Home() {
  return (
    <Grid container spacing={2} direction="column" pb={3} style={{ minHeight: '100vh' }}>
      <SectionHeader />
      <WorldMap data={mapData} />
      <DonorCountriesAccordion />
    </Grid>
  );
}
