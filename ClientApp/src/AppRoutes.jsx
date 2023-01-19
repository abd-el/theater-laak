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
import { Geautoriseerd } from './components/doneer/Geautoriseerd';
import { AdminPanel } from './components/admin/AdminPanel';
import { Ticketverkoop } from './components/Ticketverkoop/Ticketverkoop';
import { Reservering } from './components/Ticketverkoop/Reservering/Reservering'

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
    path: '/reservering',
    element: <Reservering />
  },
  {
    path: '/ticketverkoop',
    element: <Ticketverkoop />
  },
  {
    path: '/artiestenportaal',
    element: <Artiestenportaal AllowedRoles={['Admin', 'Artiest', 'Medewerker']} />
  },
  {
    path: '/accountinstellingen',
    element: <RequireAuth AllowedRoles={['Klant', 'Admin', 'Artiest', 'Medewerker']}><AccountInstellingen /></RequireAuth>
  },
  {
    path: '/login',
    element: <LoginForm />
  },
  {
    path: '/registreer',
    element: <SignupForm />
  },
  {
    path: '/ikdoneergeautoriseerd',
    element: <Geautoriseerd />
  },
  {
    path: '/Dashboard',
    element: <RequireAuth AllowedRoles={['Admin', 'Medewerker']}><AdminPanel /></RequireAuth>
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
