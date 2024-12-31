<script lang="ts" setup>
import type { ScreenProps } from './types';

import { onMounted, onUnmounted, ref } from 'vue';

import { useNamespace } from '@vben-core/composables';

import { useScreen } from './useScreen';

defineOptions({
  name: 'VbenScreenScale',
});

const props = withDefaults(defineProps<ScreenProps>(), {
  autoScale: true,
  boxStyle: () => ({}),
  delay: 200,
  fullScreen: false,
  height: 1080,
  width: 1920,
  wrapperStyle: () => ({}),
});

const emit = defineEmits<{
  (e: 'ready' | 'resize'): void;
  (e: 'scale-change', scale: number): void;
}>();

const ns = useNamespace('screen');

// 定义 refs
const screenRef = ref<HTMLElement | null>(null);
const wrapperRef = ref<HTMLElement | null>(null);

const {
  addListener,
  baseBoxStyle,
  baseWrapperStyle,
  clearListener,
  reset,
  update,
} = useScreen({
  emit,
  props,
  screenRef,
  wrapperRef,
});

// 生命周期
onMounted(() => {
  update();
  if (props.autoScale) {
    addListener();
  }
  emit('ready');
});

onUnmounted(() => {
  clearListener();
});

// 暴露方法
defineExpose({
  addListener,
  baseBoxStyle,
  baseWrapperStyle,
  clearListener,
  reset,
  update,
});
</script>

<template>
  <div :class="[ns.b()]">
    <div ref="screenRef" :style="[props.boxStyle, baseBoxStyle]">
      <div ref="wrapperRef" :style="[props.wrapperStyle, baseWrapperStyle]">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.vben-screen {
  height: 100%;
  width: 100%;
}
</style>
