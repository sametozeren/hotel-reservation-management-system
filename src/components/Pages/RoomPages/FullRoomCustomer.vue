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
                                </tr>
                            </tbody>
                        </table>
                        <div class="btn btn-danger" style="margin:0!important" @click="customerRoomExit()">Konaklamayı
                            Sonlandır</div>
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
                customerList: {},
            }
        },
        created() {
            /* 
                Oda bilgilerini çekmek için yapılan işlemler 
            */
            ipcRenderer.send('getFullRoom',
                '{"queryType":"SELECT", "queryString":"SELECT Id,Musteriler.MusteriId,Ad,' +
                'Soyad,KimlikNumarasi,CONVERT(varchar,GirisTarihi, 104) AS GirisTarihi FROM Musteriler' +
                ',MusteriOdaHareketleri WHERE Musteriler.MusteriId=MusteriOdaHareketleri.MusteriId AND ' +
                'MusteriOdaHareketleri.Durum=1 AND OdaId=' + this.id + '"}'
            );
            ipcRenderer.on('getFullRoomResponse', (err, response) => {
                this.customerList = ((JSON.parse(response || '') || {}) || []) || {};
            });
        },
        methods: {
            customerRoomExit() {
                this.customerList.forEach((customer) => {
                    /* 
                        Oda bilgilerini çekmek için yapılan işlemler 
                    */
                    ipcRenderer.send('customerRoomExit',
                        '{"queryType":"UPDATE", "queryString":"UPDATE MusteriOdaHareketleri SET Durum=0 ' +
                        'WHERE MusteriId = ' + customer.MusteriId + ';"}'
                    );
                    ipcRenderer.on('customerRoomExitResponse', (err, response) => {
                        this.customerList = ((JSON.parse(response || '') || {}) || []) || {};
                    });
                });

                /* 
                        Oda bilgilerini çekmek için yapılan işlemler 
                    */
                ipcRenderer.send('roomStatusChange',
                    '{"queryType":"UPDATE", "queryString":"UPDATE Odalar SET OdaDurumu=1 ' +
                    'WHERE OdaId = ' + this.id + ';"}'
                );
                ipcRenderer.on('roomStatusChangeResponse', (err, response) => {
                    if (response.indexOf('success') !== -1) {
                        console.log('basarılı')
                    }
                });
            }
        }
    }
</script>

<style>

</style>