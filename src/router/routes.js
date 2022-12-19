const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        // 新闻浏览
        path: '/newsBrowse',
        component: () => import('pages/news-browsing/NewsBrowing.vue')
      },
      {
        // 新闻管理
        path: '/newsManage',
        component: () => import('pages/news-management/NewsManagement.vue')
      },
      {
        // 新闻发布
        path: '/newsRelease',
        component: () => import('pages/news-release/NewsRelease.vue')
      },
      {
        // 用户管理
        path: '/userManage',
        component: () => import('pages/user-management/UserManagement.vue')
      },
      {
        path: '/userInfo',
        component: () => import('pages/user-info/UserInfo.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/login/LoginPage.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
