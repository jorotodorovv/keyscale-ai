import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from '../App';
import Play from '../play/Play';
import Drills from '../drills/Drills';
import Analytics from '../analytics/Analytics';
import Settings from '../settings/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <App />
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: <Play />,
      },
      {
        path: '/drills',
        element: <Drills />,
      },
      {
        path: '/analytics',
        element: <Analytics />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]);

export default router;