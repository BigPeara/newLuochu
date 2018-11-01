import Pay from "@/pages/pay/index.vue";
export default [{
        path: '/',
        component: () =>
            import ('@/pages/mine/index.vue')
    },
    {
        path: '/login',
        component: () =>
            import ('@/pages/mine/login/')
    },
    {
        path: '/mine/userInfo',
        meta: {
            requireAuth: true,
        },
        component: () =>
            import ('@/pages/mine/userInfo.vue')
    },
    {
        path: '/mine/readRecords',
        meta: {
            requireAuth: true,
        },
        component: () =>
            import ('@/pages/mine/readRecords.vue')
    },
    {
        path: '/mine/subRecords',
        meta: {
            requireAuth: true,
        },
        component: () =>
            import ('@/pages/mine/subRecords.vue')
    },
    {
        path: '/mine/payRecords',
        meta: {
            requireAuth: true,
        },
        component: () =>
            import ('@/pages/mine/payRecords.vue')
    },
    {
        path: '/pay',
        meta: {
            requireAuth: true,
        },
        component: Pay
    },
    {
        path: '/mine/bindMobile',
        meta: {
            requireAuth: true,
        },
        component: () =>
            import ('@/pages/mine/bindMobile.vue')
    },
    {
        path: '/mine/custService',
        component: () =>
            import ('@/pages/help/customerService.vue')
    }
]