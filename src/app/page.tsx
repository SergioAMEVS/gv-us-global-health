'use client';
import DropdownMenu from '@/components/common/DropdownMenu';
import SectionHeader from '@/components/common/SectionHeader';
import WorldMap from '@/components/maps/WordMap';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { mapData } from '@/data/mapData';

export default function Home() {
  const years = Object.keys(mapData[0]).filter((k) => k !== 'country');
  const [year, setYear] = useState(years[0]);

  console.log('Selected Year:', year);
  console.log('years', years);
  console.log('mapData', mapData);
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <SectionHeader />

      <Grid width={'100%'} display={'flex'} justifyContent="end">
        <DropdownMenu years={years} year={year} onChange={setYear} />
      </Grid>

      <WorldMap data={mapData} year={year} />
    </div>
  );
}
