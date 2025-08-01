import { Box } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import DropdownMenu from '@/components/common/DropdownMenu';
import { useSectorChart } from '@/hooks';
import { breakLine } from '@/utils/text';
import { type WorldMapDrawerHorizontalBarChartProps } from '@/types/components';
import { useEffect, useMemo } from 'react';
import { useYearStore } from '@/lib/store/useStore';

const WorldMapDrawerHorizontalBarChart = ({ data }: WorldMapDrawerHorizontalBarChartProps) => {
  const { yAxisData, seriesData } = useSectorChart(data);

  const yearOptions = useMemo(() => {
    const yearSet = new Set<string>();
    data.forEach((sector) => {
      sector.years.forEach((entry) => {
        yearSet.add(entry.year);
      });
    });
    return Array.from(yearSet).sort();
  }, [data]);

  const { setYear, setYears } = useYearStore();

  useEffect(() => {
    setYears(yearOptions);
    if (yearOptions.length > 0) {
      setYear(yearOptions[yearOptions.length - 1]);
    }
  }, [yearOptions, setYear, setYears]);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'value',
      name: 'Funding (USD million)',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        color: 'rgba(0, 0, 0, 0.38)',
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.87)',
        },
      },
      axisTick: {
        show: true,
      },
      splitLine: {
        show: false, // removes vertical grid lines
      },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: yAxisData,
      name: 'Sectors',
      nameLocation: 'middle',
      nameGap: 140, // increased gap for better spacing
      nameTextStyle: {
        color: 'rgba(0, 0, 0, 0.38)',
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.87)',
        },
      },
      axisLabel: {
        margin: 10, // adds space between labels and axis
        formatter: function (value: string) {
          return breakLine(value, 21); // adjust maxLength as needed
        },
      },
      axisTick: {
        show: false,
      },
    },
    grid: {
      left: 160, // adds space on the left for labels and axis name
      right: 30,
      top: 30,
      bottom: 60,
    },
    series: [
      {
        type: 'bar',
        data: seriesData,
        barWidth: 30,
        itemStyle: {
          color: '#0B6BCB',
        },
      },
    ],
  };

  return (
    <>
      <Box display="flex" justifyContent="end">
        <DropdownMenu />
      </Box>
      <ReactECharts
        option={option}
        style={{ height: `${90 + 45 * yAxisData.length}px`, width: '100%' }}
      />
    </>
  );
};

export default WorldMapDrawerHorizontalBarChart;
