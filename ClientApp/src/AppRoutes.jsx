import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home/Home";
import { Doneer } from "./components/doneer/Doneer";
import { Programmering } from "./components/programmering/Programmering";
import { Artiestenportaal } from './components/artiestenportaal/layout/Artiestenportaal';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />
  },
  {
    path: '/doneer',
    element: <Doneer />
  },
  {
    path: '/programmering',
    element: <Programmering />
  },
  {
    path: '/artiestenportaal',
    element: <Artiestenportaal />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
