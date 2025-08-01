import AccordionDrawer from '@/components/common/AccordionDrawer';
import DonorCountriesHorizontalBarChart from '@/components/globalHealthFunding/DonorCountriesHorizontalBarChart';
import { type DonorCountryData } from '@/types/data';

const DonorCountriesAccordion = () => {
  const accordionSummary =
    'Top 10 Donor Countries to International Health Assistance as a Share of Total Assistance (2023)';

  const countryData: DonorCountryData[] = [
    { name: 'United States', isoAlpha2: 'US', value: 58 },
    { name: 'Japan', isoAlpha2: 'JP', value: 8 },
    { name: 'Germany', isoAlpha2: 'DE', value: 93 },
    { name: 'United Kingdom', isoAlpha2: 'GB', value: 79 },
    { name: 'Canada', isoAlpha2: 'CA', value: 52 },
    { name: 'France', isoAlpha2: 'FR', value: 33 },
    { name: 'Netherlands', isoAlpha2: 'NL', value: 96 },
    { name: 'Australia', isoAlpha2: 'AU', value: 3 },
    { name: 'Korea', isoAlpha2: 'KR', value: 7 },
    { name: 'Sweden', isoAlpha2: 'SE', value: 58 },
  ];

  return (
    <AccordionDrawer panelId="test" summary={accordionSummary}>
      <DonorCountriesHorizontalBarChart data={countryData} />
    </AccordionDrawer>
  );
};

export default DonorCountriesAccordion;
