import type { EChartsOption } from 'echarts';

// 图表主题色
export const DEFAULT_COLORS = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
] as const;

// 图表类型
export type ChartType = 'bar' | 'line' | 'pie' | string;

// 图表属性
export interface VbenEchartsProps {
  /**
   * 是否自动高度
   */
  autoHeight?: boolean;
  /**
   * 是否自动调整大小
   */
  autoResize?: boolean;
  /**
   * 图表数据
   */
  chartData?: () => Record<string, any>;
  /**
   * 图表类型
   */
  echartsType?: string;
  /**
   * 图表高度
   */
  height?: string;
  /**
   * 图表ID
   */
  id?: string;
  /**
   * 加载状态
   */
  loading?: boolean;
  /**
   * 加载文本
   */
  loadingText?: string;
  /**
   * 图表配置项
   */
  options?: EChartsOption;
  /**
   * 图表主题
   */
  theme?: string;
  /**
   * 是否使用示例配置
   */
  useExample?: boolean;
}

// 图表事件
export interface VbenEchartsEvents {
  /**
   * 图表点击事件
   */
  onClick?: (params: any) => void;
  /**
   * 数据区域缩放事件
   */
  onDataZoom?: (params: any) => void;
  /**
   * 图表双击事件
   */
  onDblClick?: (params: any) => void;
  /**
   * 图表初始化完成事件
   */
  onInit?: (params: { instance: any; option: any }) => void;
  /**
   * 图例选择变化事件
   */
  onLegendSelectChanged?: (params: any) => void;
  /**
   * 图表大小改变事件
   */
  onResize?: (params: { height: number; width: number }) => void;
  /**
   * 图表更新事件
   */
  onUpdate?: (params: { instance: any; option: any }) => void;
}

export type VbenEchartsEmits = {
  [K in keyof VbenEchartsEvents]: VbenEchartsEvents[K] extends (
    ...args: infer P
  ) => any
    ? (event: K, ...args: P) => void
    : never;
}[keyof VbenEchartsEvents];

// 图表实例
export interface VbenEchartsInstance {
  clear: () => void;
  dispose: () => void;
  getDom: () => HTMLElement;
  getHeight: () => number;
  getOption: () => EChartsOption;
  getWidth: () => number;
  isDisposed: () => boolean;
  resize: () => void;
  setOption: (option: EChartsOption) => void;
}

// 图表配置项
export interface ChartTypeOptions {
  [key: string]: any;
  grid?: {
    bottom?: number | string;
    containLabel?: boolean;
    left?: number | string;
    right?: number | string;
    top?: number | string;
  };
  title?: {
    left?: number | string;
    textStyle?: {
      color?: string;
      fontSize?: number;
      fontWeight?: number | string;
    };
    top?: number | string;
  };
  tooltip?: {
    axisPointer?: {
      lineStyle?: {
        color?: string;
        type?: string;
        width?: number;
      };
      type?: string;
    };
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    textStyle?: {
      color?: string;
      fontSize?: number;
    };
    trigger?: 'axis' | 'item';
  };
}
