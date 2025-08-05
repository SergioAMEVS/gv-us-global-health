'use client';

import { Box, FormControl, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { type DropdownMenuProps } from '@/types/components';

const SelectStyles = {
  backgroundColor: '#F0F4F8',
  maxHeight: '40px',
  minWidth: '160px',
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

export default function DropdownMenu({ value, options = [], onChange }: DropdownMenuProps) {
  const handleChange = (event: SelectChangeEvent) => {
    if (onChange) onChange(event.target.value as string);
  };

  return (
    <Box sx={{ maxWidth: 420 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
          IconComponent={ArrowDownIconComponent}
          sx={SelectStyles}
        >
          {options.map((y) => (
            <MenuItem
              key={y}
              value={y}
              sx={{
                color: 'common.black',
                fontWeight: value === String(y) ? 700 : 400,
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
