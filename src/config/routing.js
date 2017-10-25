import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/protected/Dashboard'

import Gifts from '../components/protected/Gifts'
import GiftForm from '../components/protected/GiftForm'
import Friends from '../components/protected/Friends'
import FriendDetails from '../components/protected/FriendDetails'

export const publicRoutes = [
      {
        path: '/login',
        name: 'Logowanie',
        component: Login
      },
      {
        path: '/register',
        name: 'Rejestracja',
        component: Register
      }
    ];
    
export const privateRoutes = [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        nav: true
      },
      {
        path: '/friends',
        name: 'Znajomi',
        component: Friends,
        nav: true
      },
      {
        path: '/friends/:id',
        name: '',
        component: FriendDetails,
        nav: false
      },
      {
        path: '/gifts',
        name: 'GiftList',
        component: Gifts,
        nav: true
      },
      {
        path: '/gifts/form',
        pathParams: '/:id?',
        name: 'Dodaj prezent',
        component: GiftForm,
        nav: true
      }
    ];