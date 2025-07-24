import DropdownMenu from '@/components/common/DropdownMenu';
import SectionHeader from '@/components/common/SectionHeader';

export default function Home() {
  return (
    <div>
      <SectionHeader />
      {/* <Grid container spacing={4} sx={{ padding: '20px' }}> */}
      <DropdownMenu />
      {/* </Grid> */}
    </div>
  );
}
