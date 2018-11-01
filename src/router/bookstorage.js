export default [{
        path: '/',
        name: 'index',
        component: () =>
            import ('@/pages/bookstorage/index.vue')
    }, {
        path: '/book/:bid',
        component: () =>
            import ('@/pages/bookstorage/bookdetail/index.vue')
    },
    {
        path: '/book/cataloguelist/:bid',
        component: () =>
            import ('@/pages/bookstorage/bookdetail/pages/cataloguelist.vue')
    },
    {
        path: '/bookstorage/commentPage/:btitle/:bid',
        component: () =>
            import ('@/pages/bookstorage/bookdetail/pages/commentPage.vue')
    },
    {
        path: '/bookstorage/reply/:bid/:tid',
        component: () =>
            import ('@/pages/bookstorage/bookdetail/pages/reply.vue')
    },
    {
      path: '/wellChosenFemale',
      component: () => import('@/pages/wellChosenFemale/index'),
      name: '女生'
    },
    {
      path: '/wellChosenMale',
      component: () => import('@/pages/wellChosenMale/index'),
      name: '女生'
    },
    {
        path: '/rank',
        component: () => import('@/pages/new/rank'),
        name: 'rank',
        meta: { title: '排行榜'}
    },
    {
        path: '/all',
        component: () => import('@/pages/new/all'),
        name: 'all',
        meta: { title: '全本'}
    },
    {
        path: '/god',
        component: () => import('@/pages/new/god'),
        name: 'god',
        meta: { title: '大神'}
    },
    {
        path: '/exemption',
        component: () => import('@/pages/new/exemption'),
        name: 'exemption',
        meta: { title: '限免'}
    },
    {
        path: '/list',
        component: () => import('@/pages/new/list'),
        name: 'list',
        meta: { title: '列表'}
    },
    {
      path: '/bookstorage/classify/:type/:value',
      component: () =>
          import ('@/pages/bookstorage/classify/index.vue')
    },
    {
      path: '/bookstorage/moreContainer/:mids',
      component: () => import('@/pages/bookstorage/moreContainer/index.vue'),
      name: 'moreContainer'
  }
]
