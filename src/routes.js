import Home from './components/Pages/Home';
import Rooms from './components/Pages/Rooms';
import RoomDetail from './components/Pages/RoomDetail';

export const routes = [
    { path : '/', name:'home', component : Home},
    { path: '/rooms', name:'rooms', component: Rooms},
    { path: '/rooms/:id', name: 'roomdetail', component:RoomDetail},
    { path: '*', name:'default', redirect: '/' }
];