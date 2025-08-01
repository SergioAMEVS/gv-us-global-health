import React from 'react';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

type YearSliderProps = {
  years: string[];
  currentYear: string;
  onChange: (year: string) => void;
};

export default function YearSlider({ years, currentYear, onChange }: YearSliderProps) {
  const currentIndex = years.indexOf(currentYear);

  const handleSliderChange = (_: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      onChange(years[value]);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: 120 }}>
      <Slider
        min={0}
        max={years.length - 1}
        value={currentIndex}
        onChange={handleSliderChange}
        step={1}
        sx={{ flex: 1 }}
      />
      <Typography fontWeight={400} color="#636B74" fontSize={14}>
        {currentYear}
      </Typography>
    </div>
  );
}
