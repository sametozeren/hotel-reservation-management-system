<template>
    <div>
        <div class="pl-4">
            <h4 class="pt-5 text-muted font-weight-bold">Oda Bilgileri</h4>
            <h5><b>Oda Numarası:</b> {{room.Ad}}</h5>
            <h5><b>Oda Tipi:</b> {{room.Soyad}}</h5>
            <h5><b>Oda Durumu:</b> {{room.TelNo}}</h5>
            <h5><b>Açıklama:</b> {{room.DogumTarihi}}</h5>
        </div>
        <router-link tag="a" class="btn btn-primary ml-4" :to="{ name: 'roomEdit', params: { id : id}}">DÜZENLE
        </router-link>
        <router-link tag="a" class="btn btn-danger ml-4" :to="{ name: 'roomDelete', params: { id : id}}">SİL
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
                room:{},
            }
        },
        mounted() {
            /* 
                Oda bilgilerini çekmek için yapılan işlemler 
            */
            ipcRenderer.send('getRoom',
                '{"queryType":"SELECT", "queryString":""}'
            );
            ipcRenderer.on('getRoomResponse', (err, response) => {
                this.room = ((JSON.parse(response || '') || {}) || [])[0] || {};
            });
        }
    }
</script>

<style>

</style>