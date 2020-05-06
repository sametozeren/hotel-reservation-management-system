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
                                    <th scope="col">Kimlik Numarasi</th>
                                    <th scope="col">Ad</th>
                                    <th scope="col">Soyad</th>
                                    <th scope="col">Aksiyonlar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(customer, index) in customerList" :key="index">
                                    <th class="pt-4" scope="row">{{customer.KimlikNumarasi}}</th>
                                    <td class="pt-4" >{{ customer.Ad }}</td>
                                    <td class="pt-4" >{{ customer.Soyad}}</td>
                                    <td>
                                        <router-link tag="a"
                                            :to="{ name: 'customerDetail', params: { id : customer.MusteriId}}"
                                            class="btn btn-info">
                                            Detaylı Bilgi
                                        </router-link>
                                        <router-link tag="a"
                                            :to="{ name: 'customerDelete', params: { id : customer.MusteriId}}"
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
    const electron = require('electron');
    const {
        ipcRenderer
    } = electron;

    export default {
        data() {
            return {
                customerList: []
            }
        },
        created: function () {
            /* 
                Müşteri listesini çekmek için yapılan işlemler 
            */
            ipcRenderer.send('customerList',
                '{"queryType":"SELECT", "queryString":"SELECT MusteriId,Ad,Soyad,KimlikNumarasi FROM Musteriler"}'
            );
            ipcRenderer.on('customerListResponse', (err, response) => {
                this.customerList = (JSON.parse(response || '') || {}) || [];
            });
        },
    }
</script>

<style>

</style>