import Apps from '../pages/Apps';
import Arcade from '../pages/Arcade';
import Eventt from '../pages/Eventt';
import Dynamic from '../pages/Dynamic';
import Rest from '../components/Rest';
import Search from '../pages/Search';
import Today from '../pages/Today';

const routes = [
  {
    path: '/today/',
    component: Today,
  },
  {
    path: '/rest/',
    component: Rest,
  },
  {
    path: '/eventt/',
    component: Eventt,
  },
  {
    name: 'dynamic',
    path: '/dynamic/:jsx?',
    component: Dynamic,
  },
  {
    path: '/apps/',
    component: Apps,
  },
  {
    path: '/arcade/',
    component: Arcade,
  },
  {
    path: '/search/',
    component: Search,
  },
  {
    path: '/app/:id',
    asyncComponent: () => import(/* webpackChunkName: "app-details" *//* webpackPreload: true */ '../pages/AppDetails'),
  },
  {
    path: '/account/',
    popup: {
      asyncComponent: () => import(/* webpackChunkName: "account" *//* webpackPreload: true */ '../pages/Account'),
    },
  },
  {
    path: '(.*)',
    asyncComponent: () => import(/* webpackChunkName: "404" */ '../pages/404'),
  },
];

export default routes;
