import { AccordionProps, DrawerProps } from '@mui/material';
import type { DonorCountryData, SectorData } from '@/types/data';

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

export interface CheckboxGroupProps {
  groupLabel?: string;
  items: [string, boolean, boolean][]; // [label, isSelected, disabled]
  onToggle: (label: string) => void;
  vertical?: boolean; // Optional prop to switch layout
}

export interface CollapsibleRowProps {
  row: SectorData;
  level?: number;
  firstColWidth?: string;
}

export interface WorldMapDrawerTableProps {
  data: SectorData[];
}

export interface WorldMapDrawerHorizontalBarChartProps {
  data: SectorData[];
}

export interface DonorCountriesHorizontalBarChartProps {
  data: DonorCountryData[];
}
