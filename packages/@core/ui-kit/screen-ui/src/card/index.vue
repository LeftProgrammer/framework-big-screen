<script setup lang="ts">
import { computed } from 'vue';

import { ElCard } from 'element-plus';

const props = defineProps({
  contentHeaderStyle: {
    default: () => ({}),
    type: Object,
  },
  headerStyle: {
    default: () => ({}),
    type: Object,
  },
  headerTitle: {
    default: '',
    type: String,
  },
  icon: {
    default: '',
    type: String,
  },
  separateHeader: {
    default: false,
    type: Boolean,
  },
  showIcon: {
    default: true,
    type: Boolean,
  },
  title: {
    default: '',
    type: String,
  },
  type: {
    default: 'primary',
    type: String,
    validator: (value: string) =>
      ['danger', 'primary', 'success', 'warning'].includes(value),
  },
});

defineEmits(['click', 'mouseenter', 'mouseleave']);

// 计算样式
const cardClass = computed(() => [
  'vben-screen-card',
  `vben-screen-card--${props.type}`,
  {
    'vben-screen-card--separate': props.separateHeader,
  },
]);

const headerClass = computed(() => [
  'vben-screen-card__header',
  {
    'vben-screen-card__header--separate': props.separateHeader,
  },
]);

const contentClass = computed(() => [
  'vben-screen-card__content',
  {
    'vben-screen-card__content--separate': props.separateHeader,
  },
]);
</script>

<template>
  <ElCard
    :class="cardClass"
    @click="$emit('click')"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <template #header>
      <slot name="header">
        <div :class="headerClass" :style="headerStyle">
          <div class="vben-screen-card__header-main">
            <i v-if="showIcon" :class="`el-icon-${icon}`"></i>
            <span class="vben-screen-card__header-title">{{
              headerTitle
            }}</span>
          </div>
          <slot name="extra"></slot>
        </div>
      </slot>
    </template>

    <div :class="contentClass">
      <div
        v-if="title"
        class="vben-screen-card__content-header"
        :style="contentHeaderStyle"
      >
        <span class="vben-screen-card__content-title">{{ title }}</span>
      </div>
      <div class="vben-screen-card__content-body">
        <slot></slot>
      </div>
    </div>
  </ElCard>
</template>

<style lang="scss" scoped>
.vben-screen-card {
  @each $type in (primary, success, warning, danger) {
    $color: var(--el-color-#{$type});
    $light-3: var(--el-color-#{$type}-light-3);
    $light-5: var(--el-color-#{$type}-light-5);
    $light-7: var(--el-color-#{$type}-light-7);
    $light-9: var(--el-color-#{$type}-light-9);

    &--#{$type} {
      border: 1px solid $light-7;

      .vben-screen-card__header {
        i {
          color: $color;
        }
      }

      &:hover {
        border-color: $light-5;

        .vben-screen-card__header {
          color: $color;
          background: linear-gradient(to right, $light-5, $light-3);

          &--separate {
            background: $light-9;
          }
        }

        .vben-screen-card__content-header {
          background: rgba(var(--el-color-#{$type}-rgb), 0.1);
        }
      }

      .vben-screen-card__header--separate {
        border: 1px solid $light-7;

        &:hover {
          border-color: $light-5;
        }
      }
    }
  }

  height: 100%;
  border: none;
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-light);
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  perspective: 1000px;
  will-change: transform;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:hover {
    box-shadow: var(--el-box-shadow);
    transform: translateY(-4px);
  }

  :deep(.el-card__header) {
    padding: 0;
    border: none;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  :deep(.el-card__body) {
    padding: 0;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    color: var(--el-text-color-primary);
    background: var(--el-bg-color);
    border-radius: 8px 8px 0 0;
    transition: all 0.3s ease;
    transform: translateZ(0);
    backface-visibility: hidden;

    &--separate {
      margin: 16px 16px 0;
      border-radius: 8px;
    }

    &-main {
      display: flex;
      gap: 8px;
      align-items: center;
      transform: translateZ(0);

      i {
        font-size: 18px;
      }
    }

    &-title {
      font-size: 16px;
      font-weight: 500;
    }
  }

  &__content {
    transform: translateZ(0);
    backface-visibility: hidden;

    &--separate {
      margin: 0 16px 16px;
    }

    &-header {
      padding: 16px 20px;
      background: var(--el-bg-color-overlay);
      border-bottom: 1px solid var(--el-border-color-light);
      transition: all 0.3s ease;
      transform: translateZ(0);
    }

    &-title {
      font-size: 14px;
      color: var(--el-text-color-regular);
    }

    &-body {
      background: var(--el-bg-color);
      border-radius: 0 0 8px 8px;
      transform: translateZ(0);
    }
  }
}
</style>
