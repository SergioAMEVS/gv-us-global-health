'use client';
import { Box, FormControl, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

const SelectStyles = {
  backgroundColor: '#F0F4F8',
  maxHeight: '40px',
  borderRadius: '8px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSelect-icon': {
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '& .MuiSelect-select': {
    color: '#32383E',
    fontWeight: 400,
  },
};

function ArrowDownIconComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
      style={{ ...props.style, display: 'block' }}
    >
      <path d="M7 10l5 5 5-5" stroke="#000" strokeWidth="2" fill="none" />
    </svg>
  );
}

const years = [2023, 2024, 2025];

export default function DropdownMenu() {
  const [year, setYear] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  return (
    <Box sx={{ maxWidth: 220 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          onChange={handleChange}
          IconComponent={ArrowDownIconComponent}
          sx={SelectStyles}
        >
          {years.map((y) => (
            <MenuItem
              key={y}
              value={y}
              sx={{
                color: '#000',
                fontWeight: year === String(y) ? 700 : 400,
              }}
            >
              {`Year : ${y}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
