<script setup lang="ts">
import type { VbenEchartsProps } from '@vben-core/screen-ui';

import { onMounted, ref } from 'vue';

import { VbenScreenCard, VbenScreenEcharts } from '@vben-core/screen-ui';

// 图表引用
const pieChart = ref();

// 加载状态
const loading = ref(false);

// 折线图配置
const lineOptions = ref<VbenEchartsProps['options']>({
  title: {
    text: '近7天访问量趋势',
    textStyle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'normal',
    },
    top: 10,
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0,25,50,0.9)',
    borderColor: '#0088FF',
    textStyle: {
      color: '#fff',
    },
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLine: {
      lineStyle: {
        color: '#0C2E64',
      },
    },
    axisLabel: {
      color: '#90BEFF',
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#0C2E64',
      },
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(93, 141, 224, 0.3)',
        type: 'dashed',
      },
    },
    axisLabel: {
      color: '#90BEFF',
    },
  },
  series: [
    {
      name: '访问量',
      type: 'line',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      smooth: true,
      symbolSize: 8,
      lineStyle: {
        width: 3,
        color: '#0088FF',
      },
      itemStyle: {
        color: '#0088FF',
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0,136,255,0.3)',
            },
            {
              offset: 1,
              color: 'rgba(0,136,255,0)',
            },
          ],
        },
      },
    },
  ],
});

// 柱状图配置
const barOptions = ref<VbenEchartsProps['options']>({
  title: {
    text: '各部门人员分布',
    textStyle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'normal',
    },
    top: 10,
    left: 'center',
  },
  legend: {
    data: ['在职人数', '入职人数'],
    textStyle: {
      color: '#90BEFF',
    },
    top: 40,
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0,25,50,0.9)',
    borderColor: '#0088FF',
    textStyle: {
      color: '#fff',
    },
  },
  xAxis: {
    type: 'category',
    data: ['研发部', '市场部', '销售部', '运营部', '客服部'],
    axisLine: {
      lineStyle: {
        color: '#0C2E64',
      },
    },
    axisLabel: {
      color: '#90BEFF',
      interval: 0,
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#0C2E64',
      },
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(93, 141, 224, 0.3)',
        type: 'dashed',
      },
    },
    axisLabel: {
      color: '#90BEFF',
    },
  },
  series: [
    {
      name: '在职人数',
      type: 'bar',
      data: [120, 80, 100, 50, 60],
      barWidth: '20%',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#00CCFF',
            },
            {
              offset: 1,
              color: '#183FFF',
            },
          ],
        },
        borderRadius: [4, 4, 0, 0],
      },
    },
    {
      name: '入职人数',
      type: 'bar',
      data: [20, 15, 25, 10, 12],
      barWidth: '20%',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#FFB100',
            },
            {
              offset: 1,
              color: '#FF6C00',
            },
          ],
        },
        borderRadius: [4, 4, 0, 0],
      },
    },
  ],
});

// 饼图配置
const pieOptions = ref<VbenEchartsProps['options']>({
  title: {
    text: '收入来源分布',
    textStyle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'normal',
    },
    top: 10,
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
    backgroundColor: 'rgba(0,25,50,0.9)',
    borderColor: '#0088FF',
    textStyle: {
      color: '#fff',
    },
  },
  legend: {
    orient: 'vertical',
    right: '5%',
    top: 'center',
    textStyle: {
      color: '#90BEFF',
    },
  },
  series: [
    {
      name: '收入来源',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['40%', '55%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: '#0C2E64',
        borderWidth: 2,
      },
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: true,
          color: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,136,255,0.5)',
        },
      },
      data: [
        {
          value: 1548,
          name: '搜索引擎',
          itemStyle: { color: '#0088FF' },
        },
        {
          value: 335,
          name: '直接访问',
          itemStyle: { color: '#00CCFF' },
        },
        {
          value: 310,
          name: '邮件营销',
          itemStyle: { color: '#FFB100' },
        },
        {
          value: 234,
          name: '联盟广告',
          itemStyle: { color: '#FF6C00' },
        },
        {
          value: 135,
          name: '视频广告',
          itemStyle: { color: '#FF3000' },
        },
      ],
    },
  ],
});

// 模拟数据加载
const loadData = async () => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="screen-echarts-demo">
    <!-- 折线图示例 -->
    <VbenScreenCard title="折线图示例" type="primary">
      <VbenScreenEcharts
        echarts-type="line"
        :options="lineOptions"
        :loading="loading"
        :use-example="false"
        height="360px"
      />
    </VbenScreenCard>

    <!-- 柱状图示例 -->
    <VbenScreenCard title="柱状图示例" type="success">
      <VbenScreenEcharts
        echarts-type="bar"
        :options="barOptions"
        :loading="loading"
        :use-example="false"
        height="360px"
      />
    </VbenScreenCard>

    <!-- 饼图示例 -->
    <VbenScreenCard title="饼图示例" type="warning">
      <VbenScreenEcharts
        ref="pieChart"
        echarts-type="pie"
        :options="pieOptions"
        :loading="loading"
        :use-example="false"
        height="360px"
      />
    </VbenScreenCard>
  </div>
</template>

<style lang="scss" scoped>
.screen-echarts-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 24px;
  min-height: 100%;
  padding: 24px;
  background-color: #001529;

  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }

  :deep(.vben-screen-card) {
    background: rgb(0 20 40 / 80%);
    backdrop-filter: blur(4px);
    border: 1px solid rgb(0 136 255 / 10%);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 8px 24px rgb(0 136 255 / 15%);
      transform: translateY(-2px);
    }

    .el-card__header {
      padding: 12px 16px;
      border-bottom: 1px solid rgb(0 136 255 / 10%);
    }

    .el-card__body {
      padding: 16px;
    }

    .vben-screen-card__header {
      padding: 0;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
    }

    .vben-screen-card__content {
      background: transparent;
    }
  }
}
</style>
