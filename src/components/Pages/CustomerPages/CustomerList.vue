<template>
    <div class="row">
        <h4 class="pl-4 pt-2 text-muted font-weight-bold">Müşteriler</h4>
        <div class="col-md-12 pl-4">
            <router-link tag="a" class="btn btn-success" :to="{name:'newCustomer'}">Yeni Müşteri Ekle</router-link>
        </div>
        <div class="col-md-12">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12  pt-3">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Ad</th>
                                    <th scope="col">Soyad</th>
                                    <th scope="col">Aksiyonlar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(customer, index) in customers" :key="index">
                                    <th scope="row">{{customer.id}}</th>
                                    <td>{{ customer.name }}</td>
                                    <td>{{ customer.surname }}</td>
                                    <td>
                                        <router-link tag="a"
                                            :to="{ name: 'customerDetail', params: { id : customer.id}}"
                                            class="btn btn-info">
                                            Detaylı Bilgi
                                        </router-link>
                                        <router-link tag="a"
                                            :to="{ name: 'customerDelete', params: { id : customer.id}}"
                                            class="btn btn-danger">
                                            Sil
                                        </router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                customers: [{
                    id: 1,
                    name: 'Samet',
                    surname: 'Özeren',
                }, {
                    id: 2,
                    name: 'Burak',
                    surname: 'Esen',
                }, {
                    id: 3,
                    name: 'Şeymanur',
                    surname: 'Uysal',
                }, {
                    id: 4,
                    name: 'Samet',
                    surname: 'Yücel',
                }, {
                    id: 5,
                    name: 'Murat',
                    surname: 'Esen',
                }, {
                    id: 6,
                    name: 'Buğra Necmettin',
                    surname: 'Topal',
                }, {
                    id: 7,
                    name: 'Mert',
                    surname: 'Özeren',
                }, ]
            }
        },
    }
</script>

<style>

</style>