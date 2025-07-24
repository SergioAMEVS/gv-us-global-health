import { Box, Divider, Stack, Typography } from '@mui/material';
import AccordionDrawer from '../common/AccordionDrawer';

interface ComponentData {
  text: string;
}

interface DrawerContentData {
  firstComponent: ComponentData;
  secondComponent: ComponentData;
  thirdComponent: ComponentData;
}

interface DrawerContentProps {
  data: DrawerContentData;
}

const DrawerContent = ({ data }: DrawerContentProps) => {
  return (
    <Stack>
      <AccordionDrawer panelId="drawer-1" summary={data.firstComponent.text} elevation={0}>
        Content 1
      </AccordionDrawer>
      <Divider />
      <AccordionDrawer panelId="drawer-2" summary={data.secondComponent.text} elevation={0}>
        Content 2
      </AccordionDrawer>
      <Divider />
      <Box mt={2}>
        <Typography variant="body1">
          The US administration has proposed major cuts to global health programs, including the
          dissolution of USAID, significant reductions in funding, and a restructuring of global
          health efforts under the State Department, potentially impacting key health initiatives
          like PEPFAR, TB, and malaria control. The FY26 budget requests{' '}
          <strong>USD 3.8 billion for global health, down from USD 10 billion</strong>, with an
          additional <strong>USD 900 million in rescinded</strong> funding for approved programs.
        </Typography>
      </Box>
    </Stack>
  );
};

export default DrawerContent;
