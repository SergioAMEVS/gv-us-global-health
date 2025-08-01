import { useEffect, useMemo, useState } from 'react';
import type { Country, DonorCountryData } from '@/types/data';

export function useDonorCountries(data: DonorCountryData[]) {
  const [flags, setFlags] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const res = await fetch('/flags/countries.json');
        const countries: Country[] = await res.json();
        const flagMap: Record<string, string> = {};

        data.forEach(({ isoAlpha2 }) => {
          const match = countries.find(
            (c) => c.isoAlpha2.toLowerCase() === isoAlpha2.toLowerCase(),
          );
          if (match?.flag) {
            flagMap[isoAlpha2] = `data:image/png;base64,${match.flag}`;
          }
        });

        setFlags(flagMap);
      } catch (error) {
        console.error('Error fetching flags:', error);
      }
    };

    fetchFlags();
  }, [data]);

  const yAxisData = data.map(({ name }) => name);

  const richMap = useMemo(
    () =>
      Object.fromEntries(
        data.map(({ isoAlpha2 }) => [
          isoAlpha2,
          {
            height: 20,
            width: 30,
            backgroundColor: {
              image: flags[isoAlpha2] || '',
            },
          },
        ]),
      ),
    [data, flags],
  );

  const labelFormatterMap = useMemo(
    () =>
      Object.fromEntries(
        data.map(({ name, isoAlpha2 }) => [isoAlpha2, `${name}  {${isoAlpha2}|}`]),
      ),
    [data],
  );

  const labelFormatter = (value: string) => {
    const country = data.find((c) => c.name === value);
    const iso = country?.isoAlpha2 || '';
    return labelFormatterMap[iso];
  };

  const seriesData = data.map(({ name, value }) => ({ value, name }));

  return { yAxisData, richMap, labelFormatter, seriesData };
}
