<template>
    <div>
        <h5 class="pt-5 text-muted font-weight-bold">Son Kayıt Edilen Müşteriler</h5>
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Kimlik Numarasi</th>
                                    <th scope="col">Ad</th>
                                    <th scope="col">Soyad</th>
                                    <th scope="col">
                                        <DatePicker v-model="leaveDate"></DatePicker>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(customer, index) in customerList" :key="index">
                                    <th class="pt-4" scope="row">{{customer.KimlikNumarasi}}</th>
                                    <td class="pt-4">{{ customer.Ad }}</td>
                                    <td class="pt-4">{{ customer.Soyad}}</td>
                                    <td>
                                        <div @click="addCustomerToRoom(customer.MusteriId)" class="btn btn-info">Odaya
                                            Ekle</div>
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
    import DatePicker from 'vuejs-datepicker';
    const electron = require('electron');
    const {
        ipcRenderer
    } = electron;
    const date = new Date();

    export default {
        data() {
            return {
                tarih :date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear(),
                id: this.$route.params.id,
                room: {},
                customerList: {},
                leaveDate: date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear(),
            }
        },
        methods: {
            addCustomerToRoom(Id) {
                
                ipcRenderer.send('addCustomerToRoom',
                    '{"queryType":"INSERT", "queryString":"INSERT INTO MusteriOdaHareketleri (MusteriId, OdaId,' +
                    'GirisTarihi, CikisTarihi,EkstraFiyat,Durum) VALUES (' + Id + ',' + this.id + ',\'' + this.tarih +
                    '\',\'' + this.leaveDate + '\',50,0)"}'
                );
                ipcRenderer.on('addCustomerToRoomResponse', (err, response) => {
                    if (response.indexOf('success') !== -1) {
                        this.$toasted.success('Yeni Oda Başarıyla Kayıt Edildi.');
                    }
                });
            }
        },
        mounted() {
            /* 
                Müşteri listesini çekmek için yapılan işlemler 
            */
            ipcRenderer.send('customerList',
                '{"queryType":"SELECT", "queryString":"SELECT TOP(10)MusteriId,Ad,Soyad,KimlikNumarasi FROM ' +
                'Musteriler Where MusteriId NOT IN (SELECT MusteriId FROM MusteriOdaHareketleri WHERE Durum=0)"}'
            );
            ipcRenderer.on('customerListResponse', (err, response) => {
                this.customerList = (JSON.parse(response || '') || {}) || [];
            });
        },
        components: {
            DatePicker,
        },

    }
</script>

<style>
</style>