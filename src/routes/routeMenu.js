import BasicLayout from "../layouts/BasicLayout";
import PageOne from '@/pages/PageOne';
import PageTwo from '@/pages/PageTwo';

const routeMenu = [
  {
    layout: BasicLayout,
    routes: [
      {
        path: "/",
        component: PageOne,
      },
      {
        path: "/2",
        component: PageTwo,
      }
    ]
  }
];

export default routeMenu;
