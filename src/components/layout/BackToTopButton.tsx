import { Button } from '@mui/material';

export default function BackToTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button onClick={handleClick} variant="text" sx={{ fontSize: 12 }}>
      Back to top
    </Button>
  );
}
