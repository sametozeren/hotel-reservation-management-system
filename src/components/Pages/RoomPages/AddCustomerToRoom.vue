<template>
    <div>
        <h5 class="pt-5 text-muted font-weight-bold">Son Kayıt Edilen Müşteriler</h5>
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-10">
                        <div class="row">
                            <table class="table col-md-12">
                                <thead>
                                    <tr>
                                        <th scope="col">Kimlik Numarasi</th>
                                        <th scope="col">Ad</th>
                                        <th scope="col">Soyad</th>
                                        <th scope="col">İşlem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(customer, index) in customerList" :key="index">
                                        <th class="pt-4" scope="row">{{customer.KimlikNumarasi}}</th>
                                        <td class="pt-4">{{ customer.Ad }}</td>
                                        <td class="pt-4">{{ customer.Soyad}}</td>
                                        <td>
                                            <button @click.self="addCustomerToRoom(customer.MusteriId)" class="btn"
                                                :class="customer.Durum == 1 ? 'btn-info':'btn-success btn-disabled'">
                                                {{ customer.Durum===1 ? 'Odaya Ekle':'Eklendi' }}</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="col-md-6 pt-2">
                                <b>Çıkış Tarihi: </b>
                                <DatePicker style="display:inline-block;" v-model="leaveDate"></DatePicker>
                            </div>
                            <div class="btn btn-warning col-md-6" style="margin:0!important" @click="addReservation()">
                                Rezervasyon Oluştur</div>
                        </div>
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
        props: ['roomPrice'],
        data() {
            return {
                startDate: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear(),
                leaveDate: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear(),
                id: this.$route.params.id,
                customerList: [],
                customerPaymentName: '',
                orderId: '',
            }
        },
        created() {
            /* 
                Müşteri listesini çekmek için yapılan işlemler 
            */
            ipcRenderer.send('customerList',
                '{"queryType":"SELECT", "queryString":"SELECT TOP(10)MusteriId,Ad,Soyad,KimlikNumarasi FROM ' +
                'Musteriler Where MusteriId NOT IN (SELECT MusteriId FROM MusteriOdaHareketleri WHERE Durum=1)"}'
            );
            ipcRenderer.on('customerListResponse', (err, response) => {
                this.customerList = (JSON.parse(response || '') || {}) || [];

                this.customerList.forEach(element => {
                    element.Durum = 1;
                    console.log('durum çalıştı')
                });
            });
        },
        methods: {
            addCustomerToRoom(MusteriId) {
                this.customerList.forEach(element => {
                    if (element.MusteriId === MusteriId) {
                        element.Durum = 0;
                        this.customerPaymentName = element.Ad + ' ' + element.Soyad;
                        this.orderId += element.MusteriId.toString()
                    }
                });

                console.log(this.customerList)
            },
            addReservation() {
                var startDate = new Date(this.startDate);
                var leaveDate = new Date(this.leaveDate);
                var timeSpan = Math.abs(startDate.getTime() - leaveDate.getTime());
                var totalPrice = Math.ceil(timeSpan / (1000 * 3600 * 24)) * parseInt(this.roomPrice);
                var newDateArray = leaveDate.toString().split(' ');

                newDateArray = newDateArray[2] + '.' + newDateArray[1] + '.' + newDateArray[3];
                /* 
                    Fatura oluşturmak için yapılan işlemler 
                */
                ipcRenderer.send('newOrder',
                    '{"queryType":"INSERT", "queryString":"INSERT INTO Faturalar ' +
                    '(FaturaId,Tarih,ToplamFiyat,OdemeYapanKisi) VALUES(' + parseInt(this.orderId + this.id) +
                    ',\'' + this.startDate + '\',' + totalPrice + ',\'' + this.customerPaymentName +
                    '\')"}'
                );
                ipcRenderer.on('newOrderResponse', (error, response) => {
                    if (response.indexOf('status') !== -1) {
                        this.customerList.forEach((customer) => {
                            if (customer.Durum === 0) {
                                ipcRenderer.send('addCustomerToRoom',
                                    '{"queryType":"INSERT", "queryString":"INSERT INTO MusteriOdaHareketleri ' +
                                    '(MusteriId, OdaId,GirisTarihi, CikisTarihi,EkstraFiyat,Durum, FaturaId) VALUES (' +
                                    customer.MusteriId + ',' + this.id + ',\'' + this.startDate +
                                    '\',\'' + newDateArray + '\',0,1,' + parseInt(this.orderId +
                                        this.id) + ')"}'
                                );
                                ipcRenderer.on('addCustomerToRoomResponse', (err, response) => {
                                    if (response.indexOf('success') !== -1) {
                                        ipcRenderer.send('newRoom',
                                            '{"queryType":"UPDATE", "queryString":"UPDATE Odalar SET OdaDurumu=0 ' +
                                            'WHERE OdaId=' + this.id + '"}'
                                        );
                                        ipcRenderer.on('newRoomResponse', (err, response) => {
                                            if (response.indexOf('success') !== -1) {
                                                this.$router.push({ name: 'roomList' });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        },
        components: {
            DatePicker,
        },

    }
</script>

<style>
</style>