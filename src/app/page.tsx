'use client';
import DropdownMenu from '@/components/common/DropdownMenu';
import SectionHeader from '@/components/common/SectionHeader';
import WorldMap from '@/components/maps/WordMap';
import { Grid } from '@mui/material';
import { mapData } from '@/data/mapData';
import { useYearStore } from '@/lib/store/useStore';
import { useEffect } from 'react';
import FooterMap from '@/components/maps/FooterMap';

export default function Home() {
  const { setYears } = useYearStore();

  useEffect(() => {
    const y = Object.keys(mapData[0]).filter((k) => k !== 'country');
    setYears(y);
  }, [setYears]);

  return (
    <Grid style={{ margin: 0, padding: 0 }}>
      <SectionHeader />
      <Grid width={'100%'} display={'flex'} justifyContent="end">
        <DropdownMenu />
      </Grid>
      <WorldMap data={mapData} />
      <FooterMap />
    </Grid>
  );
}
