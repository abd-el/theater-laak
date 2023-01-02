import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { Navigate } from 'react-router-dom';
import { FetchData } from "./components/FetchData";
import { RequireAuth } from './components/RequireAuth';
import { Home } from "./components/Home/Home";
import { Doneer } from "./components/doneer/Doneer";
import { LoginForm } from "./components/login/LoginForm"
import { SignupForm } from './components/login/SignupForm';
import { Programmering } from "./components/programmering/Programmering";
import { Artiestenportaal } from './components/artiestenportaal/layout/Artiestenportaal';
import { AccountInstellingen } from './components/accountinstellingen/AccountInstellingen';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <RequireAuth AllowedRoles={['Artiest', 'Admin']}><Counter /></RequireAuth>
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
  {
    path: '/accountinstellingen',
    element: <AccountInstellingen />
  },
  {
    path: '/login',
    element: <LoginForm />
  },
  {
    path: '/registreer',
    element: <SignupForm />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
