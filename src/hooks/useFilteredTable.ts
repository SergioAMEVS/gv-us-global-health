import { useState, useMemo, useEffect } from 'react';
import type { TableData, YearSelection } from '@/types/data';

export function useFilteredTable(originalData: TableData[]) {
  const extractUniqueYears = (data: TableData[]): string[] => {
    const yearSet = new Set<string>();

    const traverse = (entries: TableData[]) => {
      for (const entry of entries) {
        entry.years.forEach((y) => yearSet.add(y.year));
        traverse(entry.subsectors);
      }
    };

    traverse(data);
    return Array.from(yearSet).sort(); // Optional: sort years
  };

  const initialYearSelections: YearSelection[] = extractUniqueYears(originalData).map((year) => ({
    year,
    isSelected: true,
    disabled: false,
  }));
  const [yearSelections, setYearSelections] = useState<YearSelection[]>(initialYearSelections);
  // Ensure at least one year remains selected
  useEffect(() => {
    const selectedCount = yearSelections.filter((y) => y.isSelected).length;

    const updatedSelections = yearSelections.map((y) => ({
      ...y,
      disabled: selectedCount === 1 && y.isSelected,
    }));

    // Only update if there's a change
    const hasChanged = updatedSelections.some((y, i) => y.disabled !== yearSelections[i].disabled);
    if (hasChanged) {
      setYearSelections(updatedSelections);
    }
  }, [yearSelections]);

  const selectedYearSet = useMemo(() => {
    return new Set(yearSelections.filter((y) => y.isSelected).map((y) => y.year));
  }, [yearSelections]);

  const filterData = (data: TableData[]): TableData[] => {
    return data.map((entry) => ({
      sector: entry.sector,
      years: entry.years.filter((y) => selectedYearSet.has(y.year)),
      subsectors: filterData(entry.subsectors),
    }));
  };

  const filteredData = useMemo(() => filterData(originalData), [originalData, selectedYearSet]);

  const toggleYearSelection = (year: string) => {
    setYearSelections((prev) =>
      prev.map((y) => (y.year === year && !y.disabled ? { ...y, isSelected: !y.isSelected } : y)),
    );
  };

  return {
    yearSelections,
    toggleYearSelection,
    filteredData,
  };
}
