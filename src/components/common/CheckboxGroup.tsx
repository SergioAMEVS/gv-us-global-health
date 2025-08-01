import React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { type CheckboxGroupProps } from '@/types/components';

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  groupLabel,
  items,
  onToggle,
  vertical = false,
}) => {
  return (
    <FormControl component="fieldset">
      {groupLabel && <FormLabel component="legend">{groupLabel}</FormLabel>}
      <FormGroup row={!vertical}>
        {items.map(([label, isSelected, disabled]) => (
          <FormControlLabel
            key={label}
            control={
              <Checkbox checked={isSelected} disabled={disabled} onChange={() => onToggle(label)} />
            }
            label={label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxGroup;
