'use client';

import { Button, Grid } from '@mui/material';
import DrawerContent from '@/components/globalHealthFunding/WorldMapDrawerContent';
import RightSideDrawer from '@/components/common/RightSideDrawer';
import DonorCountriesAccordion from '@/components/globalHealthFunding/DonorCountriesAccordion';
import { useDrawer } from '@/hooks';

export default function Example() {
  const { isOpen, headerText, children, openDrawer, closeDrawer } = useDrawer();

  const drawerTitle =
    'United States – Global Health Funding by Sectors and Sub-Sectors (USD Million)';

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
        {/* Button should be replaced by interaction with chart */}
        <Button onClick={() => openDrawer(drawerTitle, <DrawerContent />)}>Open Drawer</Button>
        <RightSideDrawer open={isOpen} headerText={headerText} onClose={closeDrawer}>
          {children}
        </RightSideDrawer>
      </Grid>
      <Grid>
        <DonorCountriesAccordion />
      </Grid>
    </Grid>
  );
}
