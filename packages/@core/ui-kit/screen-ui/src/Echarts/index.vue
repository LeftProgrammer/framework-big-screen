<script setup lang="ts">
import type { ECharts } from 'echarts';

import type { VbenEchartsEmits, VbenEchartsProps } from './types';

import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import * as echarts from 'echarts';
import debounce from 'lodash.debounce';

import { getChartType, getEchartsOption, mergeEChartsOption } from './common';

const props = withDefaults(defineProps<VbenEchartsProps>(), {
  autoHeight: false,
  autoResize: true,
  chartData: () => ({}),
  height: '100%',
  id: undefined,
  loading: false,
  loadingText: '加载中...',
  options: () => ({}),
  theme: undefined,
  useExample: false,
});

// 定义事件
const emit = defineEmits<VbenEchartsEmits>();

// 图表ID
const chartId = computed(
  () => `chart-${props.id || Math.random().toString(36).slice(2, 11)}`,
);

// 图表容器
const container = ref<HTMLDivElement>();

// 图表实例
const chartInstance = ref<ECharts | null>(null);

// 图表配置
const finalOptions = ref<any>({});

// 绑定事件
const bindEvents = () => {
  if (!chartInstance.value) return;

  // 点击事件
  chartInstance.value.on('click', (params) => {
    emit('onClick', params);
  });

  // 双击事件
  chartInstance.value.on('dblclick', (params) => {
    emit('onDblClick', params);
  });

  // 数据缩放事件
  chartInstance.value.on('datazoom', (params) => {
    emit('onDataZoom', params);
  });

  // 图例选择事件
  chartInstance.value.on('legendselectchanged', (params) => {
    emit('onLegendSelectChanged', params);
  });

  // 大小改变事件
  chartInstance.value.on('resize', () => {
    emit('onResize', {
      height: chartInstance.value?.getHeight() || 0,
      width: chartInstance.value?.getWidth() || 0,
    });
  });
};

// 初始化图表
const initChart = async () => {
  if (!container.value) return;

  // 创建图表实例
  chartInstance.value = echarts.init(container.value, props.theme);

  // 获取图表类型
  const type = getChartType(props.options);
  void type; // 暂时不使用类型信息，避免 console.log

  // 获取基础配置（支持从官方示例获取）
  const baseOptions = await getEchartsOption(type, props.useExample);

  // 合并用户配置
  const mergedOptions = mergeEChartsOption(baseOptions, props.options);

  // 设置配置
  finalOptions.value = mergedOptions;
  chartInstance.value.setOption(mergedOptions);

  // 绑定事件
  bindEvents();

  // 发送初始化完成事件
  emit('onInit', {
    instance: chartInstance.value,
    option: mergedOptions,
  });
};

// 更新图表
const updateChart = async () => {
  if (!chartInstance.value) {
    await initChart();
    return;
  }

  const type = getChartType(props.options);
  const baseOptions = await getEchartsOption(type, props.useExample);
  const mergedOptions = mergeEChartsOption(baseOptions, props.options);

  finalOptions.value = mergedOptions;
  chartInstance.value.setOption(mergedOptions, true);

  emit('onUpdate', {
    instance: chartInstance.value,
    option: mergedOptions,
  });
};

// 处理窗口大小变化
const handleResize = () => {
  const instance = chartInstance.value;
  if (!instance) return;

  instance.resize();
  emit('onResize', {
    height: instance.getHeight(),
    width: instance.getWidth(),
  });
};

// 销毁图表
const destroyChart = () => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
    chartInstance.value = null;
  }
};

// 监听配置变化
watch(
  () => props.options,
  () => {
    updateChart();
  },
  { deep: true },
);

// 监听数据变化
watch(
  () => props.chartData,
  () => {
    updateChart();
  },
  { deep: true },
);

// 监听加载状态
watch(
  () => props.loading,
  (val) => {
    if (!chartInstance.value) return;

    if (val) {
      chartInstance.value.showLoading({
        color: '#0088FF',
        maskColor: 'rgba(0,25,50,0.8)',
        text: props.loadingText,
        textColor: '#E1E1E1',
      });
    } else {
      chartInstance.value.hideLoading();
    }
  },
);

// 生命周期
onMounted(async () => {
  await initChart();

  if (props.autoResize) {
    window.addEventListener('resize', debounce(handleResize, 300));
  }
});

onUnmounted(() => {
  if (props.autoResize) {
    window.removeEventListener('resize', handleResize);
  }
  destroyChart();
});

// 暴露方法
defineExpose({
  getInstance: () => chartInstance.value,
  getOption: () => finalOptions.value,
  resize: handleResize,
});
</script>

<template>
  <div
    :id="chartId"
    ref="container"
    class="vben-echarts"
    :class="[{ 'auto-height': autoHeight }]"
    :style="{ height }"
  ></div>
</template>

<style lang="scss" scoped>
.vben-echarts {
  width: 100%;
  height: 100%;

  &.auto-height {
    height: auto !important;
  }
}
</style>
