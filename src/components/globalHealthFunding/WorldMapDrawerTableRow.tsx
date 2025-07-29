import { useState } from 'react';
import {
  Collapse,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  tableCellClasses,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { type CollapsibleRowProps } from '@/types/components';

function CollapsibleRow({ row, level = 0, firstColWidth }: CollapsibleRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={(theme) => ({
          [`& .${tableCellClasses.root}.${tableCellClasses.body}`]: {
            color: theme.palette.common.black,
            fontWeight: 700,
          },
        })}
      >
        <TableCell
          component="th"
          scope="row"
          sx={{
            pl: 2 + level * 2, // Dynamic left padding for identation
            width: firstColWidth,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" minHeight={34}>
            <Typography sx={{ fontWeight: 'inherit' }}>{row.sector}</Typography>
            {row.subsectors.length > 0 && (
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </Stack>
        </TableCell>
        {row.years.map(({ year, value }) => (
          <TableCell key={year} align="left">
            {value}
          </TableCell>
        ))}
      </TableRow>

      <TableRow>
        <TableCell colSpan={row.years.length + 1} sx={{ p: 0, border: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table>
              <TableBody>
                {row.subsectors.map((subRow) => (
                  <CollapsibleRow
                    key={subRow.sector}
                    row={subRow}
                    level={level + 1}
                    firstColWidth={firstColWidth}
                  />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default CollapsibleRow;
