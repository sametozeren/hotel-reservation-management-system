import Home from './components/Pages/Home';
import Rooms from './components/Pages/Rooms';

export const routes = [
    { path: '*', redirect: '/' },
    { path : '/', component : Home},
    { path: '/rooms', component: Rooms},
];