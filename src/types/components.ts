import { AccordionProps, DrawerProps } from '@mui/material';

export interface AccordionDrawerProps extends AccordionProps {
  panelId: string;
  summary: string;
  noPadding?: boolean;
}

export interface RightSideDrawerProps extends DrawerProps {
  headerText: string;
  children: React.ReactNode;
  onClose: () => void;
}
