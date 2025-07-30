import { useMemo } from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useColumnWidth, useFilteredTable } from '@/hooks';
import CheckboxGroup from '@/components/common/CheckboxGroup';
import CollapsibleRow from '@/components/globalHealthFunding/WorldMapDrawerTableRow';
import { type WorldMapDrawerTableProps } from '@/types/components';

function WorldMapDrawerTable({ data }: WorldMapDrawerTableProps) {
  const { yearSelections, toggleYearSelection, filteredData } = useFilteredTable(data);

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
