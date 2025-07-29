import { useMemo } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { useColumnWidth, useFilteredTable } from '@/hooks';
import CheckboxGroup from '../common/CheckboxGroup';
import CollapsibleRow from './WorldMapDrawerTableRow';
import { type TableData } from '@/types/data';

const tableData: TableData[] = [
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
      {
        sector: 'Population policies/Programs',
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

function WorldMapDrawerTable() {
  const { yearSelections, toggleYearSelection, filteredData } = useFilteredTable(tableData);

  const checkboxItems = yearSelections.map(
    ({ year, isSelected, disabled }) => [year, isSelected, disabled] as [string, boolean, boolean],
  );

  const selectedYears = useMemo(() => {
    return yearSelections.filter(({ isSelected }) => isSelected);
  }, [yearSelections]);

  const { firstColumnRef, rowRef, firstColWidth, firstSubColWidth } = useColumnWidth(
    selectedYears.length,
  );

  return (
    <>
      <CheckboxGroup
        groupLabel="Data Table Selected Years:"
        items={checkboxItems}
        onToggle={toggleYearSelection}
      />

      <TableContainer component={Paper} elevation={0}>
        <Table aria-label="collapsible table" sx={{ '& caption': { paddingBottom: 0 } }}>
          <caption>Last updated: April 2025</caption>
          <TableHead
            sx={(theme) => ({
              backgroundColor: '#F0F4F8',
              [`& .${tableCellClasses.head}`]: {
                color: theme.palette.common.black,
                fontWeight: 500,
              },
            })}
          >
            <TableRow ref={rowRef}>
              <TableCell
                ref={firstColumnRef}
                sx={{ width: firstColWidth, transition: 'width 0.3s ease' }}
              >
                Sector/Subsector Funding (USD Million)
              </TableCell>
              {selectedYears.map(({ year }) => (
                <TableCell key={year} align="left">
                  {year}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              backgroundColor: '#FBFCFE',
            }}
          >
            <TableRow>
              <TableCell colSpan={selectedYears.length + 1} sx={{ p: 0, border: 0 }}>
                <Table>
                  <TableBody>
                    {filteredData.map((row) => (
                      <CollapsibleRow key={row.sector} row={row} firstColWidth={firstSubColWidth} />
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default WorldMapDrawerTable;
