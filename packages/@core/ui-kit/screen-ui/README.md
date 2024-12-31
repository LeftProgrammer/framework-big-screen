# @vben/screen-ui

Vue 3 大屏自适应组件，用于处理大屏展示的自适应缩放。

## 特性

- 🎯 自动缩放：支持自动计算最佳缩放比例，可分别控制 x、y 轴缩放
- 🖥️ 全屏支持：支持全屏展示模式
- ⚡ 高性能：基于 ResizeObserver 实现，性能更优
- 🎨 样式定制：支持自定义外层和内容样式
- ⚙️ 灵活配置：支持设置设计稿尺寸、缩放延迟等
- 🛠️ 实例方法：提供重置、更新、监听器等实用方法

## 安装

```bash
pnpm add @vben/screen-ui
```

## 使用

```vue
<template>
  <Scale
    :width="1920"
    :height="1080"
    :auto-scale="true"
    :full-screen="false"
    :delay="200"
  >
    <div>您的大屏内容</div>
  </Scale>
</template>

<script setup lang="ts">
import { Scale } from '@vben/screen-ui';
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 设计稿宽度 | `number \| string` | 1920 |
| height | 设计稿高度 | `number \| string` | 1080 |
| autoScale | 自动缩放配置 | `boolean \| { x?: boolean; y?: boolean }` | true |
| fullScreen | 是否全屏铺满 | `boolean` | false |
| delay | 缩放延迟(ms) | `number` | 200 |
| boxStyle | 外层容器样式 | `CSSProperties` | {} |
| wrapperStyle | 内容容器样式 | `CSSProperties` | {} |

### 实例方法

| 方法名        | 说明         | 类型                  |
| ------------- | ------------ | --------------------- |
| update        | 手动更新缩放 | `() => Promise<void>` |
| reset         | 重置缩放     | `() => void`          |
| getState      | 获取当前状态 | `() => ScreenState`   |
| addListener   | 添加监听器   | `() => void`          |
| clearListener | 清除监听器   | `() => void`          |

### 类型定义

```ts
interface ScreenState {
  height: number | string;
  originalHeight: number;
  originalWidth: number;
  width: number | string;
}
```

## License

[MIT](./LICENSE)
