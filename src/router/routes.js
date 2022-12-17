const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/brow",
        component: () => import("pages/news-browsing/NewsBrowing.vue"),
      },
      {
        path: "manage",
        component: () => import("pages/news-management/NewsManagement.vue"),
      },
      {
        path: "/release",
        component: () => import("pages/news-release/NewsRelease.vue"),
      },
      {
        path: "/usermanage",
        component: () => import("pages/user-management/UserManagement.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/login/LoginPage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
