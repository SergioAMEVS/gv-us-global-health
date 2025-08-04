import { useMemo } from 'react';
import { type SectorData } from '@/types/data';

export function useSectorChart(data: SectorData[], year: string) {
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
  };
}
