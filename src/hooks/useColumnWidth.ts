import { useEffect, useRef, useState } from 'react';

export const useColumnWidth = (selectedYearsLength: number) => {
  const firstColumnRef = useRef<HTMLTableCellElement>(null);
  const rowRef = useRef<HTMLTableRowElement>(null);
  const colNumRef = useRef<number | undefined>();
  const colWidthRef = useRef<number | undefined>();

  const [firstColWidth, setFirstColWidth] = useState<string>('auto');
  const [firstSubColWidth, setFirstSubColWidth] = useState<string>('auto');

  useEffect(() => {
    const firstCol = firstColumnRef.current;
    const row = rowRef.current;
    const colNum = colNumRef.current;

    if (firstCol && row) {
      const firstColWidthVal = firstCol.offsetWidth;
      const rowWidth = row.offsetWidth;
      const ratio = firstColWidthVal / rowWidth;

      if (colNum !== undefined) {
        const isLastColumn = selectedYearsLength === colNum + 1;

        if (colNum >= selectedYearsLength) {
          setFirstColWidth('50%');
          setFirstSubColWidth('50%');
        } else {
          setFirstColWidth('auto');
          setFirstSubColWidth(isLastColumn ? `${colWidthRef.current}px` : `${firstColWidthVal}px`);
        }
      } else {
        if (ratio >= 0.5) {
          setFirstColWidth('50%');
          setFirstSubColWidth('50%');
          colNumRef.current = selectedYearsLength;
        } else {
          setFirstSubColWidth(`${firstColWidthVal}px`);
          colWidthRef.current = firstColWidthVal;
        }
      }
    }
  }, [selectedYearsLength]);

  return {
    firstColumnRef,
    rowRef,
    firstColWidth,
    firstSubColWidth,
  };
};
