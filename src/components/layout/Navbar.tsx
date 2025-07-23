'use client';
import theme from '../ui/theme';
import gv_icon from '../../../public/icons/GV.png';
import menu from '../../../public/icons/menu.png';
import { Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import UserMenu from './UserMenu';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const titles: Record<string, string> = {
    '/': 'Global Health Funding',
  };

  const title = titles[pathname] || 'Global Health Funding';

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Grid
      bgcolor={theme.palette.primary.bgMain}
      px={6}
      py={2.5}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      component={'nav'}
    >
      <Grid display={'flex'} alignItems={'center'} gap={3}>
        <IconButton onClick={handleMenuClick} sx={{ visibility: !isOpen ? 'visible' : 'hidden' }}>
          <Image src={menu} alt="Burguer menu" width={30} height={20} />
        </IconButton>
        <Image src={gv_icon} alt="Gates ventures icon" height={40} width={131} />
      </Grid>
      <Typography variant="h5" color="primary.main" fontWeight={700}>
        {title}
      </Typography>
      <UserMenu />
    </Grid>
  );
}
