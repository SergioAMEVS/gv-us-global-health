import { useState, useCallback } from 'react';

export const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const [children, setChildren] = useState<React.ReactNode>(null);

  const openDrawer = useCallback((header: string, content: React.ReactNode) => {
    setHeaderText(header);
    setChildren(content);
    setIsOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    setHeaderText('');
    setChildren(null);
  }, []);

  return {
    isOpen,
    headerText,
    children,
    openDrawer,
    closeDrawer,
  };
};
