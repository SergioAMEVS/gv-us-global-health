import { Button } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

const sections = [
  { path: '/', label: 'Home' },
  { path: '/us-global', label: 'US Global Health Support' },
  { path: '/dashboard', label: 'Dashboard Section' },
];

export default function NextSeccionButton() {
  const router = useRouter();
  const pathname = usePathname();

  const currentIndex = sections.findIndex((s) => s.path === pathname);
  const nextIndex = (currentIndex + 1) % sections.length;
  const nextLabel = sections[nextIndex].label;
  const nextRoute = sections[nextIndex].path;

  const handleClick = () => {
    router.push(nextRoute);
  };

  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: '24px',
        textTransform: 'capitalize',
        px: '12px',
        minHeight: '28px',
        bgColor: 'primary.dark',
        alignSelf: 'flex-end',
        fontWeight: 400,
        padding: '0px 16px',
      }}
      onClick={handleClick}
    >
      {nextLabel}
    </Button>
  );
}
