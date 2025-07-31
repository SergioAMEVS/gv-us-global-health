import React from 'react';
import Slider from '@mui/material/Slider';

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
        valueLabelDisplay="auto"
        sx={{ flex: 1 }}
      />
      <span style={{ minWidth: 40, textAlign: 'center', fontWeight: 'bold' }}>{currentYear}</span>
    </div>
  );
}
