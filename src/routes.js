import Home from './components/Pages/Home';

import Rooms from './components/Pages/RoomPages/Rooms';
import RoomList from './components/Pages/RoomPages/RoomList';
import RoomDetail from './components/Pages/RoomPages/RoomDetail';
import RoomEdit from './components/Pages/RoomPages/RoomEdit';
import NewRoom from './components/Pages/RoomPages/NewRoom';

import Customers from './components/Pages/CustomerPages/Customers';
import CustomerList from './components/Pages/CustomerPages/CustomerList';

export const routes = [{
    path: '/',
    name: 'home',
    component: Home
}, {
    path: '/rooms',
    name: 'rooms',
    component: Rooms,
    children: [{
        path: '',
        name: 'roomList',
        component: RoomList
    }, {
        path: ':id',
        name: 'roomDetail',
        component: RoomDetail
    }, {
        path: ':id/edit',
        name: 'roomEdit',
        component: RoomEdit
    },{
        path: '/newRoom',
        name: 'newRoom',
        component: NewRoom
    }],
}, {
    path: '/customer',
    name: 'customer',
    component: Customers,
    children: [{
        path: '',
        name: 'customerList',
        component: CustomerList
    }, {
        path: ':id',
        name: 'roomDetail',
        component: RoomDetail
    }, {
        path: ':id/edit',
        name: 'roomEdit',
        component: RoomEdit
    },{
        path: '/newRoom',
        name: 'newRoom',
        component: NewRoom
    }],
},{
    path: '*',
    name: 'default',
    redirect: '/'
}];