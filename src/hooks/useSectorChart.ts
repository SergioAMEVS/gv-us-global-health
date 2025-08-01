import { useState, useMemo } from 'react';
import { type SectorData } from '@/types/data';

export function useSectorChart(data: SectorData[]) {
  // Extract all unique years from the dataset
  const yearOptions = useMemo(() => {
    const yearSet: Set<string> = new Set();
    data.forEach((sector) => {
      sector.years.forEach((entry) => {
        yearSet.add(entry.year);
      });
    });
    return Array.from(yearSet).sort(); // sorted for dropdown
  }, [data]);

  // State to track the selected year
  const [year, setYear] = useState<string>(yearOptions[yearOptions.length - 1]); // default to latest year

  // Extract chart data for the selected year
  const { yAxisData, seriesData } = useMemo(() => {
    const yAxisData: string[] = [];
    const seriesData: number[] = [];

    data.forEach((sectorEntry) => {
      const sectorName = sectorEntry.sector;
      const yearData = sectorEntry.years.find((y) => y.year === year);

      if (yearData) {
        yAxisData.push(sectorName);
        seriesData.push(yearData.value);
      }
    });

    return { yAxisData, seriesData };
  }, [data, year]);

  return {
    yAxisData,
    seriesData,
    year,
    yearOptions,
    setYear,
  };
}
