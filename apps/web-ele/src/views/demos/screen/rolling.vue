<script setup lang="ts">
import type { RollingItem } from '@vben-core/screen-ui';

import { ref } from 'vue';

import { VbenScreenCard, VbenScreenRollingDisplay } from '@vben-core/screen-ui';

import { ElMessage } from 'element-plus';

import 'element-plus/es/components/message/style/css';

// 垂直滚动数据
const verticalData = ref([
  '🚀 系统性能优化完成，响应速度提升30%',
  '🎯 新功能预告：AI智能助手即将上线',
  '🔧 系统维护通知：本周日凌晨2点进行例行维护',
  '🎉 恭喜！平台用户数突破100万',
  '📊 本月业务增长报告已生成',
]);

// 水平滚动数据
const horizontalData = ref([
  '📢 重要通知：系统将于今晚进行维护升级，预计耗时2小时',
  '🌟 新功能上线：深色模式现已支持全站切换',
  '🔔 温馨提示：请及时更新您的密码以确保账户安全',
  '📋 系统公告：新版本功能介绍视频已发布',
]);

// 图文混合数据
const mixedData = ref<RollingItem[]>([
  {
    text: '系统告警：CPU使用率超过90%',
    image:
      'https://api.iconify.design/material-symbols:warning-rounded.svg?color=%23ff4d4f',
  },
  {
    text: '备份完成：数据库自动备份成功',
    image:
      'https://api.iconify.design/material-symbols:check-circle-rounded.svg?color=%2352c41a',
  },
  {
    text: '安全提醒：发现异常登录尝试',
    image:
      'https://api.iconify.design/material-symbols:security-rounded.svg?color=%23faad14',
  },
  {
    text: '更新通知：新版本V2.1.0已发布',
    image:
      'https://api.iconify.design/material-symbols:system-update-rounded.svg?color=%231890ff',
  },
]);

// HTML 内容数据
const htmlData = ref<RollingItem[]>([
  {
    html: `
      <div class="custom-item warning">
        <span class="icon">⚠️</span>
        <div class="content">
          <div class="title">系统告警</div>
          <div class="desc">检测到服务器负载异常</div>
        </div>
        <span class="time">刚刚</span>
      </div>
    `,
  },
  {
    html: `
      <div class="custom-item success">
        <span class="icon">✅</span>
        <div class="content">
          <div class="title">部署成功</div>
          <div class="desc">应用更新已完成发布</div>
        </div>
        <span class="time">10分钟前</span>
      </div>
    `,
  },
  {
    html: `
      <div class="custom-item info">
        <span class="icon">📢</span>
        <div class="content">
          <div class="title">系统公告</div>
          <div class="desc">新版本功能抢先体验</div>
        </div>
        <span class="time">30分钟前</span>
      </div>
    `,
  },
]);

// 点击事件处理
const handleItemClick = ({
  item,
  index,
}: {
  index: number;
  item: RollingItem | string;
}) => {
  const text = typeof item === 'string' ? item : item.text || item.html || '';
  ElMessage.success(`点击了第 ${index + 1} 项: ${text}`);
};
</script>

<template>
  <div class="screen-rolling-demo">
    <VbenScreenCard title="垂直滚动示例" class="demo-card">
      <div class="card-header">
        <div class="title">系统通知</div>
        <div class="subtitle">实时系统消息推送</div>
      </div>
      <VbenScreenRollingDisplay
        :data="verticalData"
        direction="vertical"
        :speed="50"
        :hover-pause="true"
        width="100%"
        height="200px"
        theme="#00ff88"
        @item-click="handleItemClick"
        class="vertical-scroll"
      />
    </VbenScreenCard>

    <VbenScreenCard title="水平滚动示例" class="demo-card">
      <div class="card-header">
        <div class="title">消息轮播</div>
        <div class="subtitle">重要公告实时播报</div>
      </div>
      <VbenScreenRollingDisplay
        :data="horizontalData"
        direction="horizontal"
        :speed="40"
        :hover-pause="true"
        width="100%"
        height="80px"
        theme="#0066ff"
        @item-click="handleItemClick"
        class="horizontal-scroll"
      />
    </VbenScreenCard>

    <VbenScreenCard title="图文混合示例" class="demo-card">
      <div class="card-header">
        <div class="title">状态监控</div>
        <div class="subtitle">系统运行状态实时监控</div>
      </div>
      <VbenScreenRollingDisplay
        :data="mixedData"
        direction="vertical"
        :speed="45"
        :hover-pause="true"
        width="100%"
        height="300px"
        theme="#cc00ff"
        @item-click="handleItemClick"
        class="mixed-scroll"
      />
    </VbenScreenCard>

    <VbenScreenCard title="HTML 内容示例" class="demo-card">
      <div class="card-header">
        <div class="title">高级通知</div>
        <div class="subtitle">自定义样式消息展示</div>
      </div>
      <VbenScreenRollingDisplay
        :data="htmlData"
        direction="vertical"
        :speed="40"
        :hover-pause="true"
        width="100%"
        height="200px"
        theme="#ff9900"
        @item-click="handleItemClick"
        class="html-scroll"
      />
    </VbenScreenCard>
  </div>
</template>

<style lang="scss" scoped>
.screen-rolling-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);

  .demo-card {
    background: rgb(255 255 255 / 5%);
    backdrop-filter: blur(10px);
    border: 1px solid rgb(255 255 255 / 10%);
    box-shadow: 0 8px 32px rgb(0 0 0 / 10%);

    .card-header {
      padding: 16px;
      border-bottom: 1px solid rgb(255 255 255 / 10%);

      .title {
        margin-bottom: 4px;
        font-size: 18px;
        font-weight: 600;
        color: rgb(255 255 255 / 90%);
      }

      .subtitle {
        font-size: 14px;
        color: rgb(255 255 255 / 50%);
      }
    }

    :deep(.vben-screen-card__content) {
      padding: 0;
    }
  }

  .vertical-scroll {
    :deep(.rolling-item) {
      margin: 8px;
      background: rgb(0 255 136 / 5%);
      border-left: 4px solid #0f8;
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        background: rgb(0 255 136 / 10%);
        transform: translateX(4px);
      }
    }
  }

  .horizontal-scroll {
    :deep(.rolling-item) {
      margin: 8px;
      background: rgb(0 102 255 / 5%);
      border-bottom: 4px solid #06f;
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        background: rgb(0 102 255 / 10%);
        transform: translateY(-4px);
      }
    }
  }

  .mixed-scroll {
    :deep(.rolling-item) {
      margin: 8px;
      background: rgb(204 0 255 / 5%);
      border-radius: 8px;
      transition: all 0.3s ease;

      .item-content {
        padding: 12px;

        .item-image {
          width: 24px;
          height: 24px;
          padding: 8px;
          background: rgb(204 0 255 / 10%);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .item-text {
          font-weight: 500;
        }
      }

      &:hover {
        background: rgb(204 0 255 / 10%);
        transform: scale(1.02);

        .item-image {
          background: rgb(204 0 255 / 20%);
          transform: rotate(360deg);
        }
      }
    }
  }

  .html-scroll {
    :deep(.rolling-item) {
      margin: 8px;

      .custom-item {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgb(255 153 0 / 5%);
        border-radius: 8px;
        transition: all 0.3s ease;

        .icon {
          margin-right: 12px;
          font-size: 24px;
        }

        .content {
          flex: 1;

          .title {
            margin-bottom: 4px;
            font-size: 16px;
            font-weight: 600;
            color: rgb(255 255 255 / 90%);
          }

          .desc {
            font-size: 14px;
            color: rgb(255 255 255 / 60%);
          }
        }

        .time {
          font-size: 12px;
          color: rgb(255 255 255 / 40%);
        }

        &:hover {
          background: rgb(255 153 0 / 10%);
          transform: translateX(4px);
        }

        &.warning {
          border-left: 4px solid #ff4d4f;
        }

        &.success {
          border-left: 4px solid #52c41a;
        }

        &.info {
          border-left: 4px solid #1890ff;
        }
      }
    }
  }
}
</style>
