<script setup lang="ts">
import type {
  ImagePreviewEmits,
  ImagePreviewProps,
  ImageStyle,
  Position,
  RotateDirection,
} from './types';

import { computed, ref } from 'vue';

import {
  exitFullscreen,
  isFullscreenEnabled,
  requestFullscreen,
} from './utils';

// Props 和 Emits 定义
defineProps<ImagePreviewProps>();
const emit = defineEmits<ImagePreviewEmits>();

// 状态管理
const scale = ref<number>(1);
const rotation = ref<number>(0);
const isFullscreen = ref<boolean>(false);
const isDragging = ref<boolean>(false);
const dragStart = ref<Position>({ x: 0, y: 0 });
const position = ref<Position>({ x: 0, y: 0 });

// 计算样式
const imageStyle = computed<ImageStyle>(() => ({
  cursor: isDragging.value ? 'grabbing' : 'grab',
  transform: [
    `translate(${position.value.x}px, ${position.value.y}px)`,
    `rotate(${rotation.value}deg)`,
    `scale(${scale.value})`,
  ].join(' '),
  transformOrigin: 'center center',
}));

// 缩放处理
const handleZoomIn = (): void => {
  scale.value = Math.min(scale.value + 0.25, 5);
};

const handleZoomOut = (): void => {
  scale.value = Math.max(scale.value - 0.25, 0.1);
};

const handleWheel = (e: WheelEvent): void => {
  if (e.deltaY < 0) {
    handleZoomIn();
  } else {
    handleZoomOut();
  }
};

// 旋转处理
const handleRotate = (direction: RotateDirection = 'clockwise'): void => {
  rotation.value += direction === 'clockwise' ? 90 : -90;
};

// 全屏处理
const toggleFullscreen = async (): Promise<void> => {
  if (!isFullscreenEnabled()) return;

  try {
    if (isFullscreen.value) {
      await exitFullscreen();
      isFullscreen.value = false;
    } else {
      const container = document.querySelector('.image-preview-content');
      if (container) {
        await requestFullscreen(container);
        isFullscreen.value = true;
      }
    }
  } catch (error) {
    console.error('全屏切换失败:', error);
  }
};

// 重置处理
const handleReset = (): void => {
  scale.value = 1;
  rotation.value = 0;
  position.value = { x: 0, y: 0 };
  isFullscreen.value = false;
};

// 拖动处理
const handleMouseDown = (e: MouseEvent): void => {
  isDragging.value = true;
  dragStart.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y,
  };
};

const handleMouseMove = (e: MouseEvent): void => {
  if (!isDragging.value) return;
  position.value = {
    x: e.clientX - dragStart.value.x,
    y: e.clientY - dragStart.value.y,
  };
};

const handleMouseUp = (): void => {
  isDragging.value = false;
};

// 键盘事件处理
const handleKeydown = (e: KeyboardEvent): void => {
  switch (e.key) {
    case '+':
    case '=': {
      handleZoomIn();
      break;
    }
    case '-': {
      handleZoomOut();
      break;
    }
    case 'ArrowLeft': {
      handleRotate('counterclockwise');
      break;
    }
    case 'ArrowRight': {
      handleRotate('clockwise');
      break;
    }
    case 'Escape': {
      handleReset();
      emit('update:visible', false);
      break;
    }
    case 'f':
    case 'F': {
      void toggleFullscreen();
      break;
    }
    case 'r':
    case 'R': {
      handleReset();
      break;
    }
  }
};

const handleClose = (): void => {
  handleReset();
  emit('update:visible', false);
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="image-preview-mask"
      @click="handleClose"
      tabindex="-1"
      @keydown="handleKeydown"
      @wheel.stop.prevent="handleWheel"
    >
      <div class="image-preview-toolbar" @click.stop>
        <div class="toolbar-item" @click.stop="handleZoomIn" title="放大">
          <i class="el-icon-zoom-in"></i>
        </div>
        <div class="toolbar-item" @click.stop="handleZoomOut" title="缩小">
          <i class="el-icon-zoom-out"></i>
        </div>
        <div
          class="toolbar-item"
          @click.stop="handleRotate('counterclockwise')"
          title="逆时针旋转"
        >
          <i class="el-icon-refresh-left"></i>
        </div>
        <div
          class="toolbar-item"
          @click.stop="handleRotate('clockwise')"
          title="顺时针旋转"
        >
          <i class="el-icon-refresh-right"></i>
        </div>
        <div class="toolbar-item" @click.stop="toggleFullscreen" title="全屏">
          <i
            class="el-icon"
            :class="isFullscreen ? 'el-icon-close' : 'el-icon-full-screen'"
          ></i>
        </div>
        <div class="toolbar-item" @click.stop="handleReset" title="重置">
          <i class="el-icon-refresh"></i>
        </div>
        <div class="toolbar-item" @click.stop="handleClose" title="关闭">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="image-preview-content" @click.stop>
        <img
          :src="imageUrl"
          alt="preview"
          @click.stop
          :style="imageStyle"
          @mousedown="handleMouseDown"
          @mousemove="handleMouseMove"
          @mouseup="handleMouseUp"
          @mouseleave="handleMouseUp"
        />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.image-preview-mask {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background-color: rgb(0 0 0 / 85%);
  outline: none;

  .image-preview-toolbar {
    position: fixed;
    top: 24px;
    left: 50%;
    z-index: 2001;
    display: flex;
    gap: 16px;
    padding: 12px 24px;
    background: rgb(0 0 0 / 65%);
    backdrop-filter: blur(8px);
    border-radius: 8px;
    transform: translateX(-50%);

    .toolbar-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      color: #fff;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        background: rgb(255 255 255 / 15%);
      }

      i {
        font-size: 20px;
      }
    }
  }

  .image-preview-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 90vw;
    max-height: 90vh;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transition: transform 0.3s ease;
      will-change: transform;
    }
  }
}
</style>
