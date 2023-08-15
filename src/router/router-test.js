export default [
    {
        path: '/mock',
        name: 'mock',
        component: () => import('@/views/test/mock.vue'),
        meta: { auth: false, title: 'mock页面' }
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/test.vue'),
        meta: { auth: false, title: 'test页面' }
    }
];

