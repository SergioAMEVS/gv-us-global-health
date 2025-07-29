import { MenuItem, Box } from '@mui/material';
import Image, { StaticImageData } from 'next/image';

export default function UserMenuItem({
  icon,
  labels,
  onClick,
  ...props
}: {
  icon: StaticImageData;
  labels: string | string[];
  onClick: () => void;
}) {
  return (
    <MenuItem
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        padding: 2,
        width: '60%',
        '&:hover': {
          backgroundColor: '#000',
          '& .menu-icon, & span': {
            filter: 'brightness(0) invert(1)',
            color: '#fff',
          },
        },
      }}
      {...props}
    >
      <Image src={icon} alt="icon" width={30} height={29} className="menu-icon" />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {Array.isArray(labels) ? (
          labels.map((label, i) => <span key={i}>{label}</span>)
        ) : (
          <span>{labels}</span>
        )}
      </Box>
    </MenuItem>
  );
}
