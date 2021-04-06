import Accordion from '../pages/Accordion';
import Eventt from '../pages/Eventt';
import PanelRight from '../components/PanelRight';
import Today from '../pages/Today';

import NotFound from '../pages/404';

// Pages
export default [
  // Index page
  {
    path: '/',
    component: Today,
    // component: Today,
    master(f7) {
      console.log(f7.theme);
      return f7.theme === 'aurora';
    },
  },
  // accordion page
  {
    path: '/accordion/',
    component: Accordion,
  },
  // event page
  {
    path: '/eventt/',
    component: Eventt,
  },
  // kitchen sink page
  {
    path: '/panel-right/',
    component: PanelRight,
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    component: NotFound,
  },
];
