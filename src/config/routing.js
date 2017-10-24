import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/protected/Dashboard'
import GiftList from '../components/protected/GiftList'
import GiftForm from '../components/protected/GiftForm'

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
        path: '/gift-list',
        name: 'GiftList',
        component: GiftList,
        nav: true
      },
      {
        path: '/gift-form',
        params: '/:id?',
        name: 'Dodaj prezent',
        component: GiftForm,
        nav: true
      }
    ];