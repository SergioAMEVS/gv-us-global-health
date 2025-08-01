'use client';
import theme from '../ui/theme';
import gv_icon from '../../../public/icons/GV.png';
import menu from '../../../public/icons/menu.png';
import { Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import UserMenu from './UserMenu';
import { useOpenMenuStore } from '@/lib/store/useStore';
import DrawerMenu from './DrawerMenu';

export default function Navbar() {
  const { open, toggleOpen } = useOpenMenuStore();
  const pathname = usePathname();

  const titles: Record<string, string> = {
    '/': 'Global Health Funding',
  };

  const title = titles[pathname ?? '/'] || 'Global Health Funding';

  return (
    <Grid
      bgcolor={theme.palette.primary.bgMain}
      px={6}
      py={2.5}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      component={'nav'}
      position="sticky"
      top={0}
      zIndex={1100}
    >
      <Grid display={'flex'} alignItems={'center'} gap={3}>
        <IconButton onClick={toggleOpen} sx={{ visibility: !open ? 'visible' : 'hidden' }}>
          <Image src={menu} alt="Burguer menu" width={30} height={20} />
        </IconButton>
        <Image src={gv_icon} alt="Gates ventures icon" height={40} width={131} />
      </Grid>
      <Typography variant="h5" color="primary.main" fontWeight={700}>
        {title}
      </Typography>
      <UserMenu />
      <DrawerMenu />
    </Grid>
  );
}
