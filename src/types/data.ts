export type TableData = {
  sector: string;
  years: {
    year: string;
    value: number;
  }[];
  subsectors: TableData[];
};

export type YearSelection = {
  year: string;
  isSelected: boolean;
  disabled: boolean;
};
