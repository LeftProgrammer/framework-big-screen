import type { EChartsOption } from 'echarts';

import type { ChartType } from './types';

// 默认颜色
export const DEFAULT_COLORS = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
];

// 图表类型配置
export const CHART_TYPE_OPTIONS: Record<string, EChartsOption> = {
  bar: {
    grid: {
      bottom: '12%',
      containLabel: true,
      left: '3%',
      right: '4%',
      top: '5%',
    },
    tooltip: {
      axisPointer: {
        type: 'shadow',
      },
      trigger: 'axis',
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#E1E1E1',
        },
      },
      type: 'category',
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: '#E1E1E1',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(225,225,225,0.1)',
        },
      },
      type: 'value',
    },
  },
  line: {
    grid: {
      bottom: '12%',
      containLabel: true,
      left: '3%',
      right: '4%',
      top: '5%',
    },
    tooltip: {
      axisPointer: {
        type: 'line',
      },
      trigger: 'axis',
    },
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#E1E1E1',
        },
      },
      boundaryGap: false,
      type: 'category',
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: '#E1E1E1',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(225,225,225,0.1)',
        },
      },
      type: 'value',
    },
  },
  pie: {
    legend: {
      orient: 'vertical',
      right: '5%',
      textStyle: {
        color: '#E1E1E1',
      },
      top: 'center',
    },
    series: [
      {
        center: ['40%', '50%'],
        emphasis: {
          label: {
            fontSize: 14,
            fontWeight: 'bold',
            show: true,
          },
        },
        itemStyle: {
          borderColor: '#0C1F3C',
          borderRadius: 10,
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        radius: ['40%', '70%'],
        type: 'pie',
      },
    ],
    tooltip: {
      trigger: 'item',
    },
  },
};

/**
 * 深度合并对象
 * @param target 目标对象
 * @param source 源对象
 * @param priorityMerge 是否优先使用源对象的值
 * @returns 合并后的对象
 */
function deepMerge<T extends Record<string, any>>(
  target: T,
  source: Partial<T>,
  priorityMerge = false,
): T {
  const result = { ...target };

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key as keyof T];
    const targetValue = target[key as keyof T];

    if (
      sourceValue &&
      targetValue &&
      typeof sourceValue === 'object' &&
      typeof targetValue === 'object' &&
      !Array.isArray(sourceValue)
    ) {
      result[key] = deepMerge(targetValue, sourceValue, priorityMerge);
    } else if (priorityMerge || sourceValue !== undefined) {
      result[key] = sourceValue as T[Extract<keyof T, string>];
    }
  });

  return result;
}

/**
 * 获取图表类型
 * @param options - 图表配置项
 * @returns 图表类型
 */
export function getChartType(options?: EChartsOption): ChartType {
  if (!options || !options.series) {
    return 'line';
  }

  const series = Array.isArray(options.series)
    ? options.series[0]
    : options.series;
  if (!series) {
    return 'line';
  }

  return (series.type as ChartType) || 'line';
}

/**
 * 获取ECharts配置项
 * @param type 图表类型
 * @returns ECharts配置项
 */
export async function getEchartsOption(
  type: ChartType,
): Promise<EChartsOption> {
  const baseOption = CHART_TYPE_OPTIONS[type] || CHART_TYPE_OPTIONS.line;
  return {
    ...baseOption,
    color: DEFAULT_COLORS,
  };
}

/**
 * 合并ECharts配置项
 * @param baseOption 基础配置
 * @param customOption 用户配置
 * @returns 合并后的配置
 */
export function mergeEChartsOption(
  baseOption: EChartsOption,
  customOption: Partial<EChartsOption>,
): EChartsOption {
  return deepMerge(baseOption, customOption, true);
}
