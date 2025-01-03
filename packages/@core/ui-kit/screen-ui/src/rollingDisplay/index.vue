<script setup lang="ts">
import type {
  RollingDisplayEmits,
  RollingDisplayProps,
  RollingItem,
} from './types';

import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';

import ImagePreview from './ImagePreview.vue';
import { debounce, getItemImage, getItemText, isHTML, throttle } from './utils';

// Props 和 Emits 定义
const props = withDefaults(defineProps<RollingDisplayProps>(), {
  clickable: true,
  direction: 'vertical',
  hoverPause: true,
  singleScroll: false,
  speed: 50,
  theme: '#0066FF',
  visibleItems: 3,
  wheelable: true,
  width: '300px',
});

const emit = defineEmits<RollingDisplayEmits>();

// 组件状态
const containerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const scrolling = ref<boolean>(true);
const previewVisible = ref<boolean>(false);
const previewImage = ref<string>('');
const isMouseEnter = ref<boolean>(false);
let animationFrameId: number;
const scrollOffset = ref<number>(0);

// 计算属性
const containerStyle = computed(() => {
  // 先把 height 的逻辑提炼出来
  let heightVal;
  if (!props.height) {
    heightVal = 'auto';
  } else if (typeof props.height === 'number') {
    heightVal = `${props.height}px`;
  } else {
    heightVal = props.height;
  }

  // 同理，width可以直接使用简单三元
  const widthVal =
    typeof props.width === 'number' ? `${props.width}px` : props.width;

  return {
    height: heightVal,
    width: widthVal,
  };
});

const itemStyle = computed(() => ({
  height:
    props.direction === 'vertical' ? `${100 / props.visibleItems}%` : '100%',
  width:
    props.direction === 'horizontal' ? `${100 / props.visibleItems}%` : '100%',
}));

const scrollStyle = computed(() => ({
  display: props.direction === 'horizontal' ? 'flex' : 'block',
  transform: `translate${props.direction === 'horizontal' ? 'X' : 'Y'}(${scrollOffset.value}px)`,
  transition: 'transform 0.3s ease',
}));

// 滚动相关
const scrollStep = computed(() => props.speed / 100);
const shouldScroll = computed(() => {
  if (!containerRef.value || !contentRef.value) return false;
  const container = containerRef.value;
  const content = contentRef.value;

  return props.direction === 'horizontal'
    ? content.scrollWidth > container.clientWidth
    : content.scrollHeight > container.clientHeight;
});

// 数据处理
const displayData = computed(() => {
  if (props.data.length === 0) return [];

  const repeatCount = Math.ceil(props.visibleItems / props.data.length) + 1;
  return Array.from({ length: repeatCount }, () => props.data).flat();
});

// 动画函数
const animate = (): void => {
  if (!scrolling.value || !shouldScroll.value) return;

  const maxScroll =
    props.direction === 'horizontal'
      ? contentRef.value?.scrollWidth || 0
      : contentRef.value?.scrollHeight || 0;

  scrollOffset.value -= scrollStep.value;

  if (Math.abs(scrollOffset.value) >= maxScroll / 2) {
    scrollOffset.value = 0;
  }

  animationFrameId = requestAnimationFrame(animate);
};

// 控制函数
const startScroll = (): void => {
  if (scrolling.value && shouldScroll.value) {
    animate();
  }
};

const stopScroll = (): void => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
  }
};

const pause = (): void => {
  scrolling.value = false;
  stopScroll();
  emit('pause');
};

const resume = (): void => {
  scrolling.value = true;
  startScroll();
  emit('resume');
};

// 事件处理
const handleMouseEnter = (event: MouseEvent): void => {
  isMouseEnter.value = true;
  emit('mouseenter', event);
  if (props.hoverPause) pause();
};

const handleMouseLeave = (event: MouseEvent): void => {
  isMouseEnter.value = false;
  emit('mouseleave', event);
  if (props.hoverPause) resume();
};

const handleMouseOver = (event: MouseEvent): void => {
  emit('mouseover', event);
};

const handleMouseOut = (event: MouseEvent): void => {
  emit('mouseout', event);
};

const handleItemClick = (
  event: MouseEvent,
  item: RollingItem | string,
): void => {
  if (!props.clickable) return;

  const index = props.data.indexOf(item);
  if (index !== -1) {
    emit('itemClick', { index, item });
  }
};

const handleImageClick = (imageUrl: string): void => {
  if (!props.clickable) return;
  previewImage.value = imageUrl;
  previewVisible.value = true;
};

const handlePreviewClose = (value: boolean): void => {
  previewVisible.value = value;
};

const handleWheel = throttle((e: WheelEvent): void => {
  if (!props.wheelable || !isMouseEnter.value) return;
  e.preventDefault();

  const delta = props.direction === 'horizontal' ? e.deltaX : e.deltaY;
  scrollOffset.value -= delta * 0.5;

  const maxScroll =
    props.direction === 'horizontal'
      ? contentRef.value?.scrollWidth || 0
      : contentRef.value?.scrollHeight || 0;

  if (Math.abs(scrollOffset.value) >= maxScroll / 2) {
    scrollOffset.value = 0;
  }
}, 16);

// 生命周期
onMounted(() => {
  nextTick(() => {
    if (shouldScroll.value) {
      startScroll();
    }
  });

  // 监听容器尺寸变化
  const resizeObserver = new ResizeObserver(
    debounce(() => {
      if (shouldScroll.value) {
        stopScroll();
        scrollOffset.value = 0;
        startScroll();
      }
    }, 200),
  );

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value);
  }

  // 清理函数
  onUnmounted(() => {
    stopScroll();
    if (containerRef.value) {
      resizeObserver.unobserve(containerRef.value);
    }
    resizeObserver.disconnect();
  });
});
</script>

<template>
  <div
    class="rolling-display"
    ref="containerRef"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
    @wheel.passive="handleWheel"
  >
    <div class="rolling-content" ref="contentRef">
      <div class="rolling-list" :style="scrollStyle">
        <div
          v-for="(item, index) in displayData"
          :key="index"
          class="rolling-item"
          :style="itemStyle"
          @click="handleItemClick($event, item)"
        >
          <slot :item="item" :index="index" name="item">
            <template v-if="typeof item === 'string'">{{ item }}</template>
            <template v-else>
              <div class="item-content">
                <img
                  v-if="getItemImage(item)"
                  :src="getItemImage(item)"
                  :alt="getItemText(item)"
                  class="item-image"
                  @click.stop="handleImageClick(getItemImage(item) || '')"
                />
                <div
                  v-if="isHTML(getItemText(item))"
                  class="item-html"
                  v-html="getItemText(item)"
                ></div>
                <span v-else class="item-text">{{ getItemText(item) }}</span>
              </div>
            </template>
          </slot>
        </div>
      </div>
    </div>

    <ImagePreview
      v-model:visible="previewVisible"
      :image-url="previewImage"
      @update:visible="handlePreviewClose"
    />
  </div>
</template>

<style lang="scss" scoped>
.rolling-display {
  position: relative;
  width: v-bind('containerStyle.width');
  height: v-bind('containerStyle.height');
  overflow: hidden;

  .rolling-content {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .rolling-list {
      width: 100%;
      height: 100%;
      will-change: transform;

      .rolling-item {
        box-sizing: border-box;
        padding: 8px;

        .item-content {
          display: flex;
          gap: 8px;
          align-items: center;

          .item-image {
            width: 32px;
            height: 32px;
            cursor: pointer;
            object-fit: cover;
            border-radius: 4px;
            transition: transform 0.3s ease;

            &:hover {
              transform: scale(1.1);
            }
          }

          .item-text {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .item-html {
            flex: 1;
            overflow: hidden;

            ::v-deep(*) {
              padding: 0;
              margin: 0;
            }
          }
        }

        &:hover {
          background-color: rgb(0 0 0 / 5%);
        }
      }
    }
  }
}
</style>
