import { type PropsWithChildren } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { type AccordionDrawerProps } from '@/types/components';

export default function AccordionDrawer({
  panelId,
  summary,
  children,
}: PropsWithChildren<AccordionDrawerProps>) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        id={`panel-header-${panelId}`}
        aria-controls={`panel-content-${panelId}`}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
