import type { RollingItem } from './types';

/**
 * 获取项目的文本内容
 * @param item 项目数据
 * @returns 文本内容
 */
export function getItemText(item: RollingItem | string): string {
  if (typeof item === 'string') return item;
  return item.text || '';
}

/**
 * 获取项目的图片 URL
 * @param item 项目数据
 * @returns 图片 URL
 */
export function getItemImage(item: RollingItem | string): string | undefined {
  if (typeof item === 'string') return undefined;
  return item.image;
}

/**
 * 判断内容是否为 HTML
 * @param str 要判断的字符串
 * @returns 是否为 HTML
 */
export function isHTML(str: string): boolean {
  return /<[a-z][\s\S]*>/i.test(str);
}

/**
 * 将十六进制颜色转换为 RGB
 * @param hex 十六进制颜色值
 * @returns RGB 颜色值数组
 */
export function hexToRgb(hex: string): number[] {
  // 移除 # 号
  hex = hex.replace(/^#/, '');

  // 处理简写形式，如 #fff
  if (hex.length === 3) {
    hex = [...hex].map((char) => char + char).join('');
  }

  // 转换为 RGB 值
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);

  return [r, g, b];
}

/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param delay 延迟时间
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: number | undefined;

  return function (...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 节流函数
 * @param fn 要执行的函数
 * @param limit 时间限制
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastRan: number;

  return function (...args: Parameters<T>) {
    if (inThrottle) {
      clearTimeout(lastRan);
      lastRan = window.setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            fn.apply(this, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    } else {
      fn.apply(this, args);
      lastRan = Date.now();
      inThrottle = true;
    }
  };
}

/**
 * 判断是否支持全屏
 * @returns 是否支持全屏
 */
export function isFullscreenEnabled(): boolean {
  return (
    document.fullscreenEnabled ||
    (document as any).webkitFullscreenEnabled ||
    (document as any).mozFullScreenEnabled ||
    (document as any).msFullscreenEnabled ||
    false
  );
}

/**
 * 请求全屏
 * @param element 要全屏的元素
 * @returns Promise
 */
export async function requestFullscreen(element: Element): Promise<void> {
  if (element.requestFullscreen) {
    return element.requestFullscreen();
  } else if ((element as any).webkitRequestFullscreen) {
    return (element as any).webkitRequestFullscreen();
  } else if ((element as any).mozRequestFullScreen) {
    return (element as any).mozRequestFullScreen();
  } else if ((element as any).msRequestFullscreen) {
    return (element as any).msRequestFullscreen();
  }
}

/**
 * 退出全屏
 * @returns Promise
 */
export async function exitFullscreen(): Promise<void> {
  if (document.exitFullscreen) {
    return document.exitFullscreen();
  } else if ((document as any).webkitExitFullscreen) {
    return (document as any).webkitExitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    return (document as any).mozCancelFullScreen();
  } else if ((document as any).msExitFullscreen) {
    return (document as any).msExitFullscreen();
  }
}
