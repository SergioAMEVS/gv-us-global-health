'use client';
import { Box, Button, Menu } from '@mui/material';
import user from '../../../public/icons/user.png';
import logout from '../../../public/icons/logout.png';
import Image from 'next/image';
import { useState } from 'react';
import UserMenuItem from './UserMenuItem';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      icon: user,
      labels: ['Account', 'Settings'],
      show: true,
      onClick: handleClose,
    },
    {
      icon: logout,
      labels: 'Logout',
      show: true,
      onClick: handleClose,
    },
  ];

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button
        variant="text"
        sx={{ color: '#32383E', textTransform: 'capitalize' }}
        endIcon={<Image src="/arrow_down.png" alt="Arrow down" width={24} height={24} />}
        onClick={handleMenuClick}
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        User Name
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          list: {
            sx: {
              pt: 0,
              pb: 0,
            },
          },
        }}
      >
        <Box display="flex" flexDirection="row" justifyContent="center">
          {menuItems
            .filter((item) => item.show)
            .map((item, idx) => (
              <UserMenuItem key={idx} {...item} />
            ))}
        </Box>
      </Menu>
    </>
  );
}
