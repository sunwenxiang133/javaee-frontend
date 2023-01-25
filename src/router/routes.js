const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/userInfo',
    children: [
      /* {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        redirect: '/'
      }, */
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
        // 普通用户管理
        path: '/userManage',
        component: () => import('pages/user-management/UserManagement.vue')
      },
      {
        //媒体号管理
        path: '/mediaManage',
        component: () => import('pages/media-manager/MediaManager.vue')
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
