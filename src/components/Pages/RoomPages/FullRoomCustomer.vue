<template>
    <div>
        <h5 class="pt-5 text-muted font-weight-bold">Odadaki Müşteriler</h5>
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
                                    <th scope="col">Giriş Tarihi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(customer, index) in customerList" :key="index">
                                    <th class="pt-4" scope="row">{{customer.KimlikNumarasi}}</th>
                                    <td class="pt-4">{{ customer.Ad }}</td>
                                    <td class="pt-4">{{ customer.Soyad}}</td>
                                    <td class="pt-4">{{ customer.GirisTarihi}}</td>
                                    <td>
                                        <div class="btn btn-danger">Müşteri Çıkışı</div>
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
                id: this.$route.params.id,
                room: {},
                customerList: {},
            }
        },
        mounted() {
            /* 
                Oda bilgilerini çekmek için yapılan işlemler 
            */
            ipcRenderer.send('getFullRoom',
                '{"queryType":"SELECT", "queryString":"SELECT Musteriler.MusteriId,Ad,' +
                'Soyad,KimlikNumarasi,CONVERT(varchar,GirisTarihi, 104) AS GirisTarihi FROM Musteriler' +
                ',MusteriOdaHareketleri WHERE Musteriler.MusteriId=MusteriOdaHareketleri.MusteriId AND OdaId=' +
                this.id + '"}'
            );
            ipcRenderer.on('getFullRoomResponse', (err, response) => {
                this.customerList = ((JSON.parse(response || '') || {}) || []) || {};
            });
        }
    }
</script>

<style>

</style>