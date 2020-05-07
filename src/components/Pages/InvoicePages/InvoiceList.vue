<template>
    <div class="row">
        <h4 class="pl-4 pt-2 text-muted font-weight-bold">Faturalar</h4>
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
                    <div class="pl-5  font-weight-bold pt-4">Görüntülemek İstediğiniz Faturayı Bulmak İçin Sol Tarafta
                        Yer Alan Arama Kutusunu
                        Kullanabilirsiniz</div>
                    <div class="col-md-12  pt-3">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Fatura No</th>
                                    <th scope="col">Oluşturulduğu Tarih</th>
                                    <th scope="col">Ödenen Tutar</th>
                                    <th scope="col">Ödeme Yapan Kişi</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(invoice, index) in invoiceList" :key="index">
                                    <th class="pt-4" scope="row">{{invoice.FaturaId}}</th>
                                    <td class="pt-4">{{ invoice.Tarih }}</td>
                                    <td class="pt-4">{{ invoice.ToplamFiyat}}</td>
                                    <td class="pt-4">{{ invoice.OdemeYapanKisi}}</td>
                                    <td>
                                        <!-- TODO -->
                                        <router-link tag="a"
                                            :to="{ name: 'customerDetail', params: { id : invoice.MusteriId}}"
                                            class="btn btn-info">
                                            Detaylı Bilgi
                                        </router-link>
                                        <router-link tag="a"
                                            :to="{ name: 'customerDelete', params: { id : invoice.MusteriId}}"
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
                invoiceList: []
            }
        },
        created: function () {
            /* 
                Müşteri listesini çekmek için yapılan işlemler 
            */
            ipcRenderer.send('invoiceList',
                '{"queryType":"SELECT", "queryString":"SELECT TOP 5 FaturaId, CONVERT(varchar,Tarih, 104)' +
                ' AS Tarih, ToplamFiyat, OdemeYapanKisi FROM Faturalar ORDER BY FaturaId DESC"}'
            );
            ipcRenderer.on('invoiceListResponse', (err, response) => {
                this.invoiceList = (JSON.parse(response || '') || {}) || [];
            });
        },
    }
</script>

<style>

</style>