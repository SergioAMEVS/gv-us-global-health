import DropdownMenu from '@/components/common/DropdownMenu';
import SectionHeader from '@/components/common/SectionHeader';
import WorldMap from '@/components/maps/WordMap';
import { Grid } from '@mui/material';

export default function Home() {
  return (
    <div>
      <SectionHeader />

      <Grid width={'100%'} display={'flex'} justifyContent="end">
        <DropdownMenu />
      </Grid>
      <WorldMap />
    </div>
  );
}
