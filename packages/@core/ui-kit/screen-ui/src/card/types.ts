import type { ExtractPropTypes } from 'vue';

// 卡片属性定义
export const screenCardProps = {
  // 内容头部样式
  contentHeaderStyle: {
    default: () => ({}),
    type: Object,
  },
  // 头部样式
  headerStyle: {
    default: () => ({}),
    type: Object,
  },
  // 头部标题
  headerTitle: {
    default: '头部',
    type: String,
  },
  // 自定义图标
  icon: {
    default: '',
    type: String,
  },
  // 分离头部
  separateHeader: {
    default: false,
    type: Boolean,
  },
  // 显示图标
  showIcon: {
    default: true,
    type: Boolean,
  },
  // 内容标题
  title: {
    default: '数据监控',
    type: String,
  },
  // 卡片类型
  type: {
    default: 'primary',
    type: String,
    values: ['primary', 'success', 'warning', 'danger'],
  },
} as const;

// 导出类型
export type ScreenCardProps = ExtractPropTypes<typeof screenCardProps>;
