import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { type AccordionDrawerProps } from '@/types/components';

const AccordionDrawer: React.FC<AccordionDrawerProps> = ({
  panelId,
  summary,
  noPadding = false,
  children,
  ...other
}) => {
  return (
    <Accordion {...other}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={`panel-header-${panelId}`}
        aria-controls={`panel-content-${panelId}`}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: noPadding ? 0 : undefined,
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionDrawer;
