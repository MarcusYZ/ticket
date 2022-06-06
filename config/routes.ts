export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/ticket',
    name: 'Tickets',
    icon: 'smile',
    component: './tickets',
  },
  {
    path: '/',
    redirect: '/ticket',
  },
  {
    component: './404',
  },
];
