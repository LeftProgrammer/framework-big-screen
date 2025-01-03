<script setup lang="ts">
import { computed, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { VbenScreenCard } from '@vben-core/screen-ui';

import {
  ElButton,
  ElCard,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElMessage,
  ElOption,
  ElProgress,
  ElSelect,
  ElSpace,
  ElSwitch,
  ElTag,
} from 'element-plus';

// 主题选项
const themeOptions = [
  { label: '主要', value: 'primary' },
  { label: '成功', value: 'success' },
  { label: '警告', value: 'warning' },
  { label: '危险', value: 'danger' },
];

// 卡片配置
const type = ref('primary');
const separateHeader = ref(false);
const showIcon = ref(true);
const customStyle = ref(false);

// 自定义样式
const headerStyle = computed(() => ({
  padding: customStyle.value ? '24px' : undefined,
  borderRadius: customStyle.value ? '12px 12px 0 0' : undefined,
}));

const contentHeaderStyle = computed(() => ({
  backdropFilter: customStyle.value ? 'blur(8px)' : undefined,
}));

// 进度条颜色
const progressColor = computed(() => `var(--el-color-${type.value})`);
const progressTrackColor = computed(
  () => `var(--el-color-${type.value}-light-9)`,
);

// 事件处理
const handleCardClick = (cardName: string) => {
  ElMessage.success(`点击了${cardName}卡片`);
};

const handleMouseEnter = (cardName: string) => {
  ElMessage.info(`鼠标进入${cardName}卡片`);
};

const handleMouseLeave = (cardName: string) => {
  ElMessage.info(`鼠标离开${cardName}卡片`);
};
</script>

<template>
  <Page
    title="卡片示例"
    description="展示了不同主题和样式的卡片组件，包括监控数据、系统状态、告警信息等"
  >
    <div class="screen-card-demo">
      <!-- 控制面板 -->
      <ElCard class="control-panel">
        <ElSpace wrap :size="20">
          <ElSelect v-model="type" placeholder="选择主题">
            <ElOption
              v-for="item in themeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
          <ElSwitch
            v-model="separateHeader"
            active-text="分离头部"
            inactive-text="合并头部"
          />
          <ElSwitch
            v-model="showIcon"
            active-text="显示图标"
            inactive-text="隐藏图标"
          />
          <ElSwitch
            v-model="customStyle"
            active-text="自定义样式"
            inactive-text="默认样式"
          />
        </ElSpace>
      </ElCard>

      <!-- 卡片列表 -->
      <div class="card-list">
        <!-- 监控卡片 -->
        <VbenScreenCard
          :type="type"
          :separate-header="separateHeader"
          :show-icon="showIcon"
          :header-style="headerStyle"
          :content-header-style="contentHeaderStyle"
          header-title="实时监控"
          title="访问统计"
          icon="Monitor"
          @click="handleCardClick('监控')"
          @mouseenter="handleMouseEnter('监控')"
          @mouseleave="handleMouseLeave('监控')"
        >
          <div class="demo-content">
            <div class="data-value">1,234</div>
            <div class="data-trend success">
              <span class="trend-value">+12.5%</span>
              <i class="el-icon-top"></i>
            </div>
            <div class="data-desc">今日访问量</div>
            <div class="data-chart">
              <div
                v-for="i in 6"
                :key="i"
                class="chart-bar"
                :style="{ height: `${Math.random() * 60 + 20}px` }"
              ></div>
            </div>
          </div>
        </VbenScreenCard>

        <!-- 告警卡片 -->
        <VbenScreenCard
          :type="type"
          :separate-header="separateHeader"
          :show-icon="showIcon"
          :header-style="headerStyle"
          :content-header-style="contentHeaderStyle"
          header-title="告警信息"
          title="系统告警"
          icon="Warning"
          @click="handleCardClick('告警')"
        >
          <template #header>
            <div class="custom-header">
              <i class="el-icon-warning"></i>
              <span>告警中心</span>
              <div class="header-tags">
                <ElTag
                  size="small"
                  effect="dark"
                  type="warning"
                  style="display: inline-block"
                >
                  3条未处理
                </ElTag>
                <ElTag
                  size="small"
                  effect="dark"
                  type="success"
                  style="display: inline-block"
                >
                  5条已处理
                </ElTag>
              </div>
            </div>
          </template>
          <div class="demo-content">
            <div class="alert-list">
              <div class="alert-item" v-for="i in 3" :key="i">
                <div class="alert-icon warning">
                  <i class="el-icon-warning"></i>
                </div>
                <div class="alert-content">
                  <div class="alert-title">CPU使用率超过阈值</div>
                  <div class="alert-time">2025-01-03 14:30:00</div>
                </div>
                <div class="alert-status">未处理</div>
              </div>
            </div>
          </div>
        </VbenScreenCard>

        <!-- 性能卡片 -->
        <VbenScreenCard
          :type="type"
          :separate-header="separateHeader"
          :show-icon="showIcon"
          :header-style="headerStyle"
          :content-header-style="contentHeaderStyle"
          header-title="性能监控"
          title="系统性能"
          icon="Cpu"
          @click="handleCardClick('性能')"
        >
          <template #extra>
            <ElDropdown>
              <ElButton type="success" link>
                操作
                <i class="el-icon-arrow-down"></i>
              </ElButton>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem>刷新数据</ElDropdownItem>
                  <ElDropdownItem>导出报表</ElDropdownItem>
                  <ElDropdownItem>系统设置</ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
          </template>
          <div class="demo-content system-status">
            <div class="status-ring">
              <ElProgress
                type="dashboard"
                :percentage="80"
                :color="progressColor"
                :track-color="progressTrackColor"
              />
              <div class="ring-info">
                <div class="info-title">系统得分</div>
                <div class="info-value">80分</div>
              </div>
            </div>
            <div class="status-list">
              <div
                class="status-item"
                v-for="(item, index) in ['CPU', '内存', '磁盘']"
                :key="index"
              >
                <div class="item-header">
                  <span>{{ item }}使用率</span>
                  <span class="item-value">
                    {{ Math.floor(Math.random() * 100) }}%
                  </span>
                </div>
                <ElProgress
                  :percentage="Math.floor(Math.random() * 100)"
                  :color="progressColor"
                  :track-color="progressTrackColor"
                  :show-text="false"
                  :stroke-width="4"
                />
              </div>
            </div>
          </div>
        </VbenScreenCard>

        <!-- 错误卡片 -->
        <VbenScreenCard
          :type="type"
          :separate-header="separateHeader"
          :show-icon="showIcon"
          :header-style="headerStyle"
          :content-header-style="contentHeaderStyle"
          header-title="错误日志"
          title="系统错误"
          icon="CircleClose"
        >
          <div class="demo-content error-log">
            <div class="error-summary">
              <div class="summary-item">
                <div class="item-value danger">12</div>
                <div class="item-label">今日错误</div>
              </div>
              <div class="divider"></div>
              <div class="summary-item">
                <div class="item-value">98.5%</div>
                <div class="item-label">系统稳定性</div>
              </div>
            </div>
            <div class="error-trend">
              <div class="trend-header">
                <span>错误趋势</span>
                <ElTag size="small" type="danger">较昨日 +2</ElTag>
              </div>
              <div class="trend-chart">
                <div
                  v-for="i in 7"
                  :key="i"
                  class="trend-bar"
                  :style="{ height: `${Math.random() * 40 + 10}px` }"
                ></div>
              </div>
              <div class="trend-footer">
                <span v-for="i in 7" :key="i">{{ i }}日</span>
              </div>
            </div>
          </div>
        </VbenScreenCard>
      </div>
    </div>
  </Page>
</template>

<style lang="scss" scoped>
.screen-card-demo {
  padding: 24px;
  background-color: var(--el-bg-color);

  .control-panel {
    margin-bottom: 24px;

    :deep(.el-card__body) {
      padding: 20px;
    }

    :deep(.el-space) {
      width: 100%;
    }

    :deep(.el-select) {
      width: 120px;
    }
  }

  .card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 24px;
  }
}

.demo-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
}

.data-value {
  margin-bottom: 12px;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--el-text-color-primary);
  transition: color 0.3s ease;
}

.data-trend {
  display: flex;
  gap: 4px;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;

  &.success {
    color: var(--el-color-success);
  }

  &.danger {
    color: var(--el-color-danger);
  }

  .trend-value {
    font-weight: 500;
  }

  i {
    font-size: 12px;
  }
}

.data-desc {
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.data-chart {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  height: 80px;
  padding: 12px;
  margin-top: 16px;
  background: var(--el-fill-color-light);
  border-radius: 8px;

  .chart-bar {
    width: 20px;
    background: var(--el-color-primary);
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      transform: scaleY(1.1);
    }
  }
}

.alert-list {
  width: 100%;

  .alert-item {
    display: flex;
    align-items: center;
    padding: 12px;
    background: var(--el-fill-color-light);
    border-radius: 8px;
    transition: transform 0.3s ease;

    & + .alert-item {
      margin-top: 12px;
    }

    &:hover {
      transform: translateX(4px);
    }

    .alert-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      margin-right: 12px;
      border-radius: 8px;

      &.warning {
        color: var(--el-color-warning);
        background: var(--el-color-warning-light-9);
      }

      i {
        font-size: 24px;
      }
    }

    .alert-content {
      flex: 1;
      text-align: left;

      .alert-title {
        margin-bottom: 4px;
        font-size: 14px;
        font-weight: 500;
        color: var(--el-text-color-primary);
      }

      .alert-time {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }

    .alert-status {
      padding: 2px 8px;
      font-size: 12px;
      color: var(--el-color-warning);
      background: var(--el-color-warning-light-9);
      border-radius: 4px;
    }
  }
}

.system-status {
  .status-ring {
    position: relative;
    margin-bottom: 24px;

    .ring-info {
      position: absolute;
      top: 50%;
      left: 50%;
      text-align: center;
      transform: translate(-50%, -50%);

      .info-title {
        font-size: 14px;
        color: var(--el-text-color-secondary);
      }

      .info-value {
        font-size: 24px;
        font-weight: 600;
        color: var(--el-text-color-primary);
      }
    }
  }

  .status-list {
    width: 100%;

    .status-item {
      & + .status-item {
        margin-top: 16px;
      }

      .item-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;

        .item-value {
          font-weight: 500;
          color: var(--el-text-color-primary);
        }
      }
    }
  }
}

.error-log {
  width: 100%;

  .error-summary {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;

    .summary-item {
      text-align: center;

      .item-value {
        margin-bottom: 4px;
        font-size: 24px;
        font-weight: 600;
        color: var(--el-text-color-primary);

        &.danger {
          color: var(--el-color-danger);
        }
      }

      .item-label {
        font-size: 14px;
        color: var(--el-text-color-secondary);
      }
    }

    .divider {
      width: 1px;
      height: 40px;
      margin: 0 24px;
      background: var(--el-border-color-light);
    }
  }

  .error-trend {
    .trend-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      font-size: 14px;
      font-weight: 500;
    }

    .trend-chart {
      display: flex;
      gap: 8px;
      align-items: flex-end;
      height: 60px;
      padding: 12px;
      margin-bottom: 8px;
      background: var(--el-fill-color-light);
      border-radius: 8px;

      .trend-bar {
        flex: 1;
        background: var(--el-color-danger);
        border-radius: 4px;
        transition: all 0.3s ease;

        &:hover {
          transform: scaleY(1.1);
        }
      }
    }

    .trend-footer {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--el-text-color-secondary);
    }
  }
}

.custom-header {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 16px;
  font-weight: 500;

  i {
    font-size: 20px;
  }

  .header-tags {
    display: flex;
    gap: 8px;
    margin-left: auto;
  }
}
</style>
