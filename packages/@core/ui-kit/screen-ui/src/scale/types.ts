import type { ComputedRef, CSSProperties, Ref } from 'vue';

// Props 类型定义
export interface ScreenProps {
  // 自动缩放配置
  autoScale?:
    | {
        x?: boolean;
        y?: boolean;
      }
    | boolean;
  // 外层样式
  boxStyle?: CSSProperties;
  // 缩放延迟
  delay?: number;
  // 是否全屏铺满
  fullScreen?: boolean;
  // 设计稿高度
  height?: number | string;
  // 设计稿宽度
  width?: number | string;
  // 内容样式
  wrapperStyle?: CSSProperties;
}

// 内部状态
export interface ScreenState {
  height: number | string;
  originalHeight: number;
  originalWidth: number;
  width: number | string;
}

// 组件事件
export interface ScreenEmits {
  (e: 'ready' | 'resize'): void;
  (e: 'scale-change', scale: number): void;
}

// useScreen 钩子的参数
export interface UseScreenOptions {
  emit: ScreenEmits;
  props: ScreenProps;
  screenRef: Ref<HTMLElement | null>;
  wrapperRef: Ref<HTMLElement | null>;
}

// 组件实例方法
export interface ScreenInstance {
  // 添加监听器
  addListener: () => void;
  // 基础样式
  baseBoxStyle: ComputedRef<CSSProperties>;
  baseWrapperStyle: ComputedRef<CSSProperties>;
  // 清除监听器
  clearListener: () => void;
  // 获取状态
  getState: () => ScreenState;
  // 重置
  reset: () => void;
  // 更新大小和缩放
  update: () => Promise<void>;
}
