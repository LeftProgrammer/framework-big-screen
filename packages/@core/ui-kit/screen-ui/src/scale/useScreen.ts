import type { ScreenInstance, ScreenState, UseScreenOptions } from './types';

import type { CSSProperties } from 'vue';
import { computed, reactive } from 'vue';

import { useDebounceFn } from '@vueuse/core';

export function useScreen({
  emit,
  props,
  screenRef,
  wrapperRef,
}: UseScreenOptions): ScreenInstance {
  // 状态管理
  const state = reactive<ScreenState>({
    height: props.height || 1080,
    originalHeight: window.screen.height,
    originalWidth: window.screen.width,
    width: props.width || 1920,
  });

  // 基础样式
  const baseBoxStyle = computed<CSSProperties>(() => ({
    background: '#000',
    backgroundSize: '100% 100%',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative' as const, // 使用 as const 来明确类型
    width: '100vw',
  }));

  const baseWrapperStyle = computed<CSSProperties>(() => ({
    overflow: 'hidden',
    position: 'relative' as const,
    transformOrigin: 'left top',
    transitionDuration: '500ms',
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 100,
  }));

  // 初始化大小
  const initSize = async () => {
    if (!screenRef.value || !wrapperRef.value) return;

    screenRef.value.scrollLeft = 0;
    screenRef.value.scrollTop = 0;

    if (props.width && props.height) {
      state.width = props.width;
      state.height = props.height;
    } else {
      state.width = wrapperRef.value.clientWidth;
      state.height = wrapperRef.value.clientHeight;
    }

    if (!state.originalHeight || !state.originalWidth) {
      state.originalWidth = window.screen.width;
      state.originalHeight = window.screen.height;
    }
  };

  // 更新容器大小
  const updateSize = () => {
    if (!wrapperRef.value) return;

    const width = state.width || state.originalWidth;
    const height = state.height || state.originalHeight;

    wrapperRef.value.style.width = `${width}px`;
    wrapperRef.value.style.height = `${height}px`;
  };

  // 自动缩放
  const autoScale = (scale: number) => {
    if (!props.autoScale || !wrapperRef.value) return;

    const domWidth = wrapperRef.value.clientWidth;
    const domHeight = wrapperRef.value.clientHeight;
    const currentWidth = document.body.clientWidth;
    const currentHeight = document.body.clientHeight;

    wrapperRef.value.style.transform = `scale(${scale},${scale})`;

    let mx = Math.max((currentWidth - domWidth * scale) / 2, 0);
    let my = Math.max((currentHeight - domHeight * scale) / 2, 0);

    if (typeof props.autoScale === 'object') {
      !props.autoScale.x && (mx = 0);
      !props.autoScale.y && (my = 0);
    }

    wrapperRef.value.style.margin = `${my}px ${mx}px`;
  };

  // 更新缩放
  const updateScale = () => {
    if (!wrapperRef.value) return;

    const currentWidth = document.body.clientWidth;
    const currentHeight = document.body.clientHeight;
    const realWidth = state.width || state.originalWidth;
    const realHeight = state.height || state.originalHeight;

    const widthScale = currentWidth / +realWidth;
    const heightScale = currentHeight / +realHeight;

    if (props.fullScreen) {
      wrapperRef.value.style.transform = `scale(${widthScale},${heightScale})`;
      return;
    }

    const scale = Math.min(widthScale, heightScale);
    autoScale(scale);
    emit?.('scale-change', scale);
  };

  // 更新处理函数（带防抖）
  const update = useDebounceFn(async () => {
    await initSize();
    updateSize();
    updateScale();
    emit?.('resize');
  }, props.delay || 200);

  // 重置
  const reset = () => {
    if (!wrapperRef.value) return;
    wrapperRef.value.style.transform = '';
    wrapperRef.value.style.margin = '';
    update();
  };

  // 清除监听
  const clearListener = () => {
    window.removeEventListener('resize', update);
  };

  // 添加监听
  const addListener = () => {
    window.addEventListener('resize', update);
  };

  // 获取状态
  const getState = () => state;

  return {
    addListener,
    baseBoxStyle,
    baseWrapperStyle,
    clearListener,
    getState,
    reset,
    update,
  };
}
