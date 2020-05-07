<template>
    <div class="row">
        <h4 class="pl-4 pt-2 text-muted font-weight-bold">Rezervasyon Geçmişi</h4>
        <div class="col-md-12">
            <div class="container-fluid">
                <div class="row">
                    <div class="form-group bmd-form-group col-md-4 pl-0 ml-0">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="material-icons">search</i>
                                </span>
                            </div>
                            <input type="text" class="form-control" placeholder="Ara..">
                        </div>
                    </div>
                    <div class="pl-5 pt-4 font-weight-bold">En fazla oluşturulan son 5 kayıt listelenecektir.
                        Görüntülemek
                        istediğiniz rezervasyon bilgisini bulmak için
                        <br>sol tarafta yer alan arama kutusunu kullanabilirsiniz.</div>
                    <div class="col-md-12  pt-3">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Oda Numarası</th>
                                    <th scope="col">Kimlik Numarası</th>
                                    <th scope="col">Ad</th>
                                    <th scope="col">Soyad</th>
                                    <th scope="col">Giriş Tarihi</th>
                                    <th scope="col">Çıkış Tarihi</th>
                                    <th scope="col">Durum</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(reservation, index) in reservationHistoryList" :key="index">
                                    <th class="pt-4" scope="row">{{reservation.OdaNumarasi}}</th>
                                    <th class="pt-4" scope="row">{{reservation.KimlikNumarasi}}</th>
                                    <td class="pt-4">{{ reservation.Ad }}</td>
                                    <td class="pt-4">{{ reservation.Soyad}}</td>
                                    <td class="pt-4">{{ reservation.GirisTarihi}}</td>
                                    <td class="pt-4">{{ reservation.CikisTarihi}}</td>
                                    <td class="pt-4">{{ reservation.Durum==true?'Aktif':'Pasif'}}</td>
                                    <td>
                                        <!-- TODO -->
                                        <router-link tag="a"
                                            :to="{ name: 'customerDetail', params: { id : reservation.MusteriId}}"
                                            class="btn btn-info">
                                            Detaylı Bilgi
                                        </router-link>
                                        <router-link tag="a"
                                            :to="{ name: 'customerDelete', params: { id : reservation.MusteriId}}"
                                            class="btn btn-danger">
                                            Sil
                                        </router-link>
                                        <!-- TODO -->
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
                reservationHistoryList: []
            }
        },
        created: function () {
            /* 
                Müşteri listesini çekmek için yapılan işlemler 
            */
            ipcRenderer.send('reservationHistoryList',
                '{"queryType":"SELECT", "queryString":"SELECT Musteriler.MusteriId,MusteriOdaHareketleri.Id,' +
                'Ad,Soyad,KimlikNumarasi, OdaNumarasi, CONVERT(varchar,GirisTarihi, 104) AS GirisTarihi, ' +
                'CONVERT(varchar,CikisTarihi, 104) AS  CikisTarihi, MusteriOdaHareketleri.Durum FROM ' +
                'MusteriOdaHareketleri, Musteriler, Odalar WHERE Musteriler.MusteriId=MusteriOdaHareketleri.MusteriId' +
                ' AND MusteriOdaHareketleri.OdaId=Odalar.OdaId"}'
            );
            ipcRenderer.on('reservationHistoryListResponse', (err, response) => {
                this.reservationHistoryList = (JSON.parse(response || '') || {}) || [];
            });
        },
    }
</script>

<style>

</style>