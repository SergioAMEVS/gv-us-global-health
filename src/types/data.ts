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

export type DonorCountryData = {
  name: string;
  isoAlpha2: string;
  value: number;
};

export type Country = {
  name: string;
  isoAlpha2: string;
  flag: string;
};
