import { useMemo } from 'react';
import { type SectorData } from '@/types/data';
import { useYearStore } from '@/lib/store/useStore';

export function useSectorChart(data: SectorData[]) {
  const { year } = useYearStore();

  // Extrae todos los años únicos de la data
  const yearOptions = useMemo(() => {
    const yearSet: Set<string> = new Set();
    data.forEach((sector) => {
      sector.years.forEach((entry) => {
        yearSet.add(entry.year);
      });
    });
    return Array.from(yearSet).sort();
  }, [data]);

  // Extrae los datos del gráfico para el año global
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
  };
}
