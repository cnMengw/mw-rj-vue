export default [
    {
        path: '/mock',
        name: 'mock',
        component: () => import('@/views/mock/mock.vue'),
        meta: { auth: false, title: 'mock页面' }
    },
    {
        path: '/meike',
        name: 'meike',
        component: () => import('@/views/meike/meike.vue'),
        meta: { auth: false, title: '美刻云下载页面' }
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/mock/test.vue'),
        meta: { auth: false, title: 'test页面' }
    }
];

