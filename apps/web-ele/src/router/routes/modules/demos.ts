import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('demos.title'),
    },
    name: 'Demos',
    path: '/demos',
    children: [
      {
        meta: {
          title: $t('demos.elementPlus'),
        },
        name: 'NaiveDemos',
        path: '/demos/element',
        component: () => import('#/views/demos/element/index.vue'),
      },
      {
        meta: {
          title: $t('demos.form'),
        },
        name: 'BasicForm',
        path: '/demos/form',
        component: () => import('#/views/demos/form/basic.vue'),
      },
      {
        path: 'screen',
        name: 'Screen',
        redirect: '/demos/screen/card',
        meta: {
          title: '大屏组件',
        },
        children: [
          {
            path: 'card',
            name: 'ScreenCard',
            component: () => import('#/views/demos/screen/card.vue'),
            meta: {
              title: '卡片组件',
            },
          },
          {
            path: 'echarts',
            name: 'ScreenEcharts',
            component: () => import('#/views/demos/screen/echarts.vue'),
            meta: {
              title: '图表组件',
            },
          },
        ],
      },
    ],
  },
];

export default routes;
