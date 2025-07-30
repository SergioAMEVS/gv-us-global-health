export type SectorData = {
  sector: string;
  years: {
    year: string;
    value: number;
  }[];
  subsectors: SectorData[];
};

export type YearSelection = {
  year: string;
  isSelected: boolean;
  disabled: boolean;
};
