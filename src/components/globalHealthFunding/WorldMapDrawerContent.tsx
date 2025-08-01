import { Divider, Stack, Typography } from '@mui/material';
import WorldMapDrawerTable from '@/components/globalHealthFunding/WorldMapDrawerTable';
import WorldMapDrawerHorizontalBarChart from '@/components/globalHealthFunding/WorldMapDrawerHorizontalBarChart';

const DrawerContent = () => {
  const tableData = [
    {
      sector: 'United States',
      years: [
        {
          year: '2019',
          value: 7682.4,
        },
        {
          year: '2020',
          value: 9083.6,
        },
        {
          year: '2021',
          value: 9140.3,
        },
        {
          year: '2022',
          value: 13150.4,
        },
        {
          year: '2023',
          value: 8479.3,
        },
      ],
      subsectors: [
        {
          sector: 'Basic Health',
          years: [
            {
              year: '2019',
              value: 2068.1,
            },
            {
              year: '2020',
              value: 2139.1,
            },
            {
              year: '2021',
              value: 2445.9,
            },
            {
              year: '2022',
              value: 4601.2,
            },
            {
              year: '2023',
              value: 2670.4,
            },
          ],
          subsectors: [
            {
              sector: 'Subsector 1',
              years: [
                {
                  year: '2019',
                  value: 7682.4,
                },
                {
                  year: '2020',
                  value: 9083.6,
                },
                {
                  year: '2021',
                  value: 9140.3,
                },
                {
                  year: '2022',
                  value: 13150.4,
                },
                {
                  year: '2023',
                  value: 8479.3,
                },
              ],
              subsectors: [],
            },
          ],
        },
        {
          sector: 'General Health',
          years: [
            {
              year: '2019',
              value: 170.8,
            },
            {
              year: '2020',
              value: 136.0,
            },
            {
              year: '2021',
              value: 532.5,
            },
            {
              year: '2022',
              value: 553.2,
            },
            {
              year: '2023',
              value: 452.3,
            },
          ],
          subsectors: [
            {
              sector: 'Subsector 1',
              years: [
                {
                  year: '2019',
                  value: 7682.4,
                },
                {
                  year: '2020',
                  value: 9083.6,
                },
                {
                  year: '2021',
                  value: 9140.3,
                },
                {
                  year: '2022',
                  value: 13150.4,
                },
                {
                  year: '2023',
                  value: 8479.3,
                },
              ],
              subsectors: [],
            },
          ],
        },
        {
          sector: 'Non Communicable Diseases',
          years: [
            {
              year: '2019',
              value: 0.0,
            },
            {
              year: '2020',
              value: 0.0,
            },
            {
              year: '2021',
              value: 0.0,
            },
            {
              year: '2022',
              value: 60.6,
            },
            {
              year: '2023',
              value: 8.7,
            },
          ],
          subsectors: [],
        },
        {
          sector: 'Population policies/Programs',
          years: [
            {
              year: '2019',
              value: 5443.3,
            },
            {
              year: '2020',
              value: 6808.4,
            },
            {
              year: '2021',
              value: 6161.8,
            },
            {
              year: '2022',
              value: 7995.1,
            },
            {
              year: '2023',
              value: 5347.7,
            },
          ],
          subsectors: [
            {
              sector: 'Subsector 1',
              years: [
                {
                  year: '2019',
                  value: 7682.4,
                },
                {
                  year: '2020',
                  value: 9083.6,
                },
                {
                  year: '2021',
                  value: 9140.3,
                },
                {
                  year: '2022',
                  value: 13150.4,
                },
                {
                  year: '2023',
                  value: 8479.3,
                },
              ],
              subsectors: [],
            },
          ],
        },
      ],
    },
  ];
  const barChartData = tableData[0].subsectors;

  return (
    <Stack gap={2}>
      <WorldMapDrawerHorizontalBarChart data={barChartData} />
      <Divider />
      <WorldMapDrawerTable data={tableData} />
      <Divider />
      <Typography variant="body1">
        The US administration has proposed major cuts to global health programs, including the
        dissolution of USAID, significant reductions in funding, and a restructuring of global
        health efforts under the State Department, potentially impacting key health initiatives like
        PEPFAR, TB, and malaria control. The FY26 budget requests{' '}
        <strong>USD 3.8 billion for global health, down from USD 10 billion</strong>, with an
        additional <strong>USD 900 million in rescinded</strong> funding for approved programs.
      </Typography>
    </Stack>
  );
};

export default DrawerContent;
