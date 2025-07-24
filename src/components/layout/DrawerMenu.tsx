import useOpenMenuStore from '@/lib/store/useStore';
import { Box, Button, Drawer, Grid, IconButton, Typography } from '@mui/material';
import close from '../../../public/icons/close.png';
import arrowLeft from '../../../public/icons/arrow_left.png';
import Image from 'next/image';
import Link from 'next/link';

export default function DrawerMenu() {
  const { open, toggleOpen } = useOpenMenuStore();

  const sidebarLinks = [
    {
      label: 'Global Health Funding',
      href: '/',
    },
    {
      label: 'US Global Health Support',
      href: '/us-global-health-support',
      children: [
        { label: 'US Global Health Appropriations', href: '/us-global-health-aprropriations' },
        { label: 'USAID-Exti Analysis', href: '/usaid-exti' },
      ],
    },
    {
      label: 'Impact Analysis',
      href: '/impact-analysis',
      children: [
        { label: 'US Global Health Appropriations', href: '/us-global-health-aprropriations' },
      ],
    },
    {
      label: 'NIH Grant Terminations by State & institution',
      href: '/nih-grant-terminations',
      children: [
        { label: 'Frozen, Terminated, Reinstated Grants', href: '/frozen-terminated-reinstated' },
        {
          label:
            'NIH Grant Terminations: Institutional, Programmatic, and Institute-Level Funding Disruptions',
          href: '/nih-grant-terminations-institutional-programmatic',
        },
      ],
    },
  ];

  return (
    <Drawer
      open={open}
      onClose={toggleOpen}
      slotProps={{
        paper: {
          sx: {
            borderRight: '8px solid #4393E4',
            py: '30px ',
            px: '60px',
            width: '26%',
          },
        },
      }}
    >
      <Grid
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        alignContent={'center'}
      >
        <Button
          variant="text"
          sx={{
            color: 'common.black',
            textTransform: 'capitalize',
            fontSize: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            ml: 4,
          }}
          startIcon={<Image src={arrowLeft} alt="Arrow left" width={10} height={10} />}
        >
          Placemats
        </Button>
        <IconButton onClick={toggleOpen}>
          <Image src={close} alt="Close menu" width={14} height={14} />
        </IconButton>
      </Grid>
      <Grid mt={4}>
        <Typography fontWeight={700} fontSize={24} color="primary.main">
          US Health Funds:
        </Typography>
        <Typography fontWeight={700} fontSize={24} color="primary.main">
          Allocation Trends & Recent Cuts
        </Typography>
        <Box mt={2} mb={4} height="2px" bgcolor="#C7DFF7" />
      </Grid>
      <Grid display={'flex'} flexDirection="column" gap={2}>
        {sidebarLinks.map((item) => (
          <Box key={item.href} display="flex" flexDirection="column" gap={2}>
            <Link href={item.href} style={{ textDecoration: 'none', width: '100%' }}>
              <Typography
                fontWeight={400}
                fontSize={16}
                letterSpacing={0.5}
                color="#171A1C"
                sx={{
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {item.label}
              </Typography>
            </Link>
            {item.children &&
              item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  style={{ textDecoration: 'none', width: '90%' }}
                >
                  <Typography
                    fontWeight={400}
                    fontSize={16}
                    letterSpacing={0.5}
                    color="#171A1C"
                    sx={{
                      cursor: 'pointer',
                      pl: 3,
                      transition: 'color 0.2s',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {child.label}
                  </Typography>
                </Link>
              ))}
          </Box>
        ))}
      </Grid>
    </Drawer>
  );
}
