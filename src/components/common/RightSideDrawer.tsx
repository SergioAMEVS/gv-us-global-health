import React from 'react';
import { Drawer, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { type RightSideDrawerProps } from '@/types/components';

const RightSideDrawer: React.FC<RightSideDrawerProps> = ({
  open,
  headerText,
  children,
  onClose,
  ...other
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} {...other}>
      <Box sx={{ width: 952, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{headerText}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box mt={2}>{children}</Box>
      </Box>
    </Drawer>
  );
};

export default RightSideDrawer;
