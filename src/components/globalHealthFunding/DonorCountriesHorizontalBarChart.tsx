import ReactECharts from 'echarts-for-react';
import { useDonorCountries } from '@/hooks/useDonorCountries';
import { type DonorCountriesHorizontalBarChartProps } from '@/types/components';

const DonorCountriesHorizontalBarChart = ({ data }: DonorCountriesHorizontalBarChartProps) => {
  const { yAxisData, richMap, labelFormatter, seriesData } = useDonorCountries(data);

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      valueFormatter: (value: number) => `${value}%`,
    },
    xAxis: {
      type: 'value',
      axisLine: { show: true, lineStyle: { color: 'rgba(0, 0, 0, 0.87)' } },
      axisLabel: {
        formatter: (value: number) => `${value}%`,
      },
      axisTick: { show: true },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: yAxisData,
      axisLine: { show: true, lineStyle: { color: 'rgba(0, 0, 0, 0.87)' } },
      axisLabel: {
        margin: 10,
        formatter: labelFormatter,
        rich: richMap,
      },
      axisTick: { show: false },
    },
    grid: {
      left: 160,
      right: 30,
      top: 30,
      bottom: 30,
    },
    series: [
      {
        type: 'bar',
        data: seriesData,
        barWidth: 30,
        itemStyle: { color: '#0B6BCB' },
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${60 + 45 * yAxisData.length}px`, width: '100%' }}
      notMerge={true}
      lazyUpdate={true}
    />
  );
};

export default DonorCountriesHorizontalBarChart;
