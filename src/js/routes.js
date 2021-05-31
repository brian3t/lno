import Accordion from '../pages/Accordion';
import Band from '../pages/Band';
import Chat from '../pages/Chat';
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
    master(f7){
      console.log(`route / loaded`)
      window.ff7=f7
      // hide_search_bar()
    },
  },
  // accordion page
  {
    path: '/accordion/',
    component: Accordion,
  },
  // event page
  {
    path: '/band/',
    component: Band,
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
// chat
  {
    path: '/chat/',
    component: Chat,
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    component: NotFound,
  },
];
