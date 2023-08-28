// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../layout/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
      },

      {
        path: '/about',
        name: 'about',

        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
      },

      {
        path: '/add-user',
        name: 'add-user',
        component: () =>
          import(/* webpackChunkName: "AddUser" */ '../views/AddUser.vue'),
      },

      {
        path: '/user/:id',
        name: 'user detail',
        component: () =>
          import(/* webpackChunkName: "user" */ '../views/User.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
