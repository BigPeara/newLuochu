export default [{
    path: '/',
    meta: {
        requireAuth: true,
    },
    component: () =>
        import ('@/pages/bookcase/index.vue')
}, ]