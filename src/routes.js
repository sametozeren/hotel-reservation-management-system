import Home from './components/Pages/Home';

import Rooms from './components/Pages/RoomPages/Rooms';
import RoomList from './components/Pages/RoomPages/RoomList';
import RoomDetail from './components/Pages/RoomPages/RoomDetail';
import RoomEdit from './components/Pages/RoomPages/RoomEdit';
import RoomDelete from './components/Pages/RoomPages/RoomDelete';
import NewRoom from './components/Pages/RoomPages/NewRoom';

import Customers from './components/Pages/CustomerPages/Customers';
import CustomerList from './components/Pages/CustomerPages/CustomerList';
import CustomerDetail from './components/Pages/CustomerPages/CustomerDetail';
import CustomerEdit from './components/Pages/CustomerPages/CustomerEdit';
import CustomerDelete from './components/Pages/CustomerPages/CustomerDelete';
import NewCustomer from './components/Pages/CustomerPages/NewCustomer';

import Invoice from './components/Pages/InvoicePages/Invoice';
import InvoiceList from './components/Pages/InvoicePages/InvoiceList';

import ReservationHistory from './components/Pages/ReservationHistoryPages/ReservationHistory';
import ReservationHistoryList from './components/Pages/ReservationHistoryPages/ReservationHistoryList';

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
    }, {
        path: ':id/delete',
        name: 'roomDelete',
        component: RoomDelete
    }, {
        path: '/newRoom',
        name: 'newRoom',
        component: NewRoom
    }],
}, {
    path: '/customers',
    name: 'customers',
    component: Customers,
    children: [{
        path: '',
        name: 'customerList',
        component: CustomerList
    }, {
        path: ':id',
        name: 'customerDetail',
        component: CustomerDetail
    }, {
        path: ':id/edit',
        name: 'customerEdit',
        component: CustomerEdit
    }, {
        path: ':id/delete',
        name: 'customerDelete',
        component: CustomerDelete
    }, {
        path: '/newCustomer',
        name: 'newCustomer',
        component: NewCustomer
    }],
},{
    path: '/reservationHistory',
    name: 'reservationHistory',
    component: ReservationHistory,
    children: [{
        path: '',
        name: 'reservationHistoryList',
        component: ReservationHistoryList
    }]
}, {
    path: '/invoice',
    name: 'invoice',
    component: Invoice,
    children: [{
        path: '',
        name: 'invoiceList',
        component: InvoiceList
    }]
},{
    path: '*',
    name: 'default',
    redirect: '/'
}];