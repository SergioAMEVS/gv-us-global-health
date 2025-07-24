'use client';

import { Button, Grid } from '@mui/material';
import AccordionDrawer from '@/components/common/AccordionDrawer';
import DrawerContent from '@/components/globalHealthFunding/WorldMapDrawerContent';
import RightSideDrawer from '@/components/common/RightSideDrawer';
import { useDrawer } from '@/hooks/useDrawer';

export default function Example() {
  const { isOpen, headerText, children, openDrawer, closeDrawer } = useDrawer();
  const accordionSummary =
    'Top 10 Donor Countries to International Health Assistance as a Share of Total Assistance (2023)';
  const accordionContent = 'Content Here'; // Could be a component
  const drawerTitle =
    'United States – Global Health Funding by Sectors and Sub-Sectors (USD Million)';
  const drawerData = {
    firstComponent: {
      text: 'Component 01',
    },
    secondComponent: {
      text: 'Component 02',
    },
    thirdComponent: {
      text: 'Component 03',
    },
  };

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
        <Button onClick={() => openDrawer(drawerTitle, <DrawerContent data={drawerData} />)}>
          Open Drawer
        </Button>
        <RightSideDrawer open={isOpen} headerText={headerText} onClose={closeDrawer}>
          {children}
        </RightSideDrawer>
      </Grid>
      <Grid>
        <AccordionDrawer panelId="test" summary={accordionSummary} noPadding>
          <AccordionDrawer panelId="test-inner" summary={accordionSummary} elevation={0}>
            {accordionContent}
          </AccordionDrawer>
        </AccordionDrawer>
      </Grid>
    </Grid>
  );
}
