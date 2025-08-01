import { Box } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import DropdownMenu from '@/components/common/DropdownMenu';
import { useSectorChart } from '@/hooks';
import { breakLine } from '@/utils/text';
import { type WorldMapDrawerHorizontalBarChartProps } from '@/types/components';

const WorldMapDrawerHorizontalBarChart = ({ data }: WorldMapDrawerHorizontalBarChartProps) => {
  const { yAxisData, seriesData, year, yearOptions, setYear } = useSectorChart(data);

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
        <DropdownMenu value={year} options={yearOptions} onChange={setYear} />
      </Box>
      <ReactECharts
        option={option}
        style={{ height: `${90 + 45 * yAxisData.length}px`, width: '100%' }}
      />
    </>
  );
};

export default WorldMapDrawerHorizontalBarChart;
