export interface RollingItem {
  html?: string;
  image?: string;
  text?: string;
}

export interface RollingDisplayProps {
  /** 是否可点击 */
  clickable?: boolean;
  /** 要显示的数据列表 */
  data: (RollingItem | string)[];
  /** 滚动方向 */
  direction?: 'horizontal' | 'vertical';
  /** 组件高度 */
  height?: number | string;
  /** 是否在鼠标悬停时暂停滚动 */
  hoverPause?: boolean;
  /** 是否允许单个项目滚动 */
  singleScroll?: boolean;
  /** 滚动速度，数值越大速度越快 */
  speed?: number;
  /** 主题色，支持十六进制颜色值 */
  theme?: string;
  /** 可见项目数量 */
  visibleItems?: number;
  /** 是否支持鼠标滚轮控制 */
  wheelable?: boolean;
  /** 组件宽度 */
  width?: number | string;
}

export interface RollingDisplayEmits {
  (event: 'change' | 'pause' | 'resume'): void;
  (
    event: 'mouseenter' | 'mouseleave' | 'mouseout' | 'mouseover',
    event: MouseEvent,
  ): void;
  (
    event: 'itemClick',
    payload: { index: number; item: RollingItem | string },
  ): void;
}

export interface ImagePreviewProps {
  /** 预览图片的 URL */
  imageUrl: string;
  /** 是否显示预览 */
  visible: boolean;
}

export interface ImagePreviewEmits {
  (e: 'update:visible', value: boolean): void;
}

export interface Position {
  x: number;
  y: number;
}

export interface ImageStyle {
  cursor: string;
  transform: string;
  transformOrigin: string;
}

export type RotateDirection = 'clockwise' | 'counterclockwise';
