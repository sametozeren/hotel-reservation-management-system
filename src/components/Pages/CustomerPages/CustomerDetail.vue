<template>
    <div>
        <div class="pl-4">
            <h4 class="pt-5 text-muted font-weight-bold">Müşteri Bilgileri</h4>
            <h5><b>Ad:</b> {{customer.Ad}}</h5>
            <h5><b>Soyad:</b> {{customer.Soyad}}</h5>
            <h5><b>Telefon Numarası:</b> {{customer.TelNo}}</h5>
            <h5><b>Doğum Tarihi:</b> {{customer.DogumTarihi}}</h5>
            <h5><b>Kimlik Numrası:</b> {{customer.KimlikNumarasi}}</h5>
            <h5><b>Uyruk:</b> {{customer.KimlikTipi}}</h5>
            <h5><b>Ülke:</b> {{customer.UlkeAdi}}</h5>
        </div>
        <router-link tag="a" class="btn btn-primary ml-4" :to="{ name: 'customerEdit', params: { id : id}}">Düzenle
        </router-link>
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
                customer: {},
            }
        },
        mounted() {
            /* 
                Müşteri bilgilerini çekmek için yapılan işlemler 
            */
            ipcRenderer.send('getCustomer',
                '{"queryType":"SELECT", "queryString":"SELECT MusteriId,Ad,Soyad,TelNo,'+
                'CONVERT(varchar,DogumTarihi, 104) AS DogumTarihi,KimlikNumarasi,' +
                'KimlikTipi,UlkeAdi FROM Musteriler,Ulkeler,KimlikTipleri' + ' WHERE MusteriId=' + this.id +
                ' AND KimlikTipleri.KimlikTipiId=Musteriler.KimlikTipiId AND Musteriler.UlkeId=Ulkeler.UlkeId"}'
            );
            ipcRenderer.on('getCustomerResponse', (err, response) => {
                this.customer = ((JSON.parse(response || '') || {}) || [])[0] || {};
            });
        }
    }
</script>

<style>

</style>