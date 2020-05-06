<template>
    <div class="row">
        <div class="col-md-4">
            <div class="pl-4">
                <h4 class="pt-5 text-muted font-weight-bold">Oda Bilgileri</h4>
                <h5><b>Oda Numarası:</b> {{room.OdaNumarasi}}</h5>
                <h5><b>Oda Tipi:</b> {{room.Tip}}</h5>
                <h5><b>Oda Durumu:</b> <span class="rounded-circle mt-2 ml-1 pt-2 col-md-12"
                        :style="room.OdaDurumu ? 'background-color: green;':'background-color: red;'"></span></h5>
                <h5><b>Açıklama:</b> {{room.Aciklama}}</h5>
            </div>
            <router-link tag="a" class="btn btn-primary ml-4" :to="{ name: 'roomEdit', params: { id : id}}">DÜZENLE
            </router-link>
            <router-link tag="a" class="btn btn-danger ml-4" :to="{ name: 'roomDelete', params: { id : id}}">SİL
            </router-link>
        </div>

        <div class="col-md-8">
            <FullRoomCustomer v-if="!room.OdaDurumu" />
            <AddCustomerToRoom :roomPrice="room.Fiyat" v-else/>
        </div>

    </div>
</template>

<script>
    import FullRoomCustomer from './FullRoomCustomer'
    import AddCustomerToRoom from './AddCustomerToRoom'

    const electron = require('electron');
    const {
        ipcRenderer
    } = electron;

    export default {
        data() {
            return {
                id: this.$route.params.id,
                room: {},
            }
        },
        mounted() {
            /* 
                Oda bilgilerini çekmek için yapılan işlemler 
            */
            ipcRenderer.send('getRoom',
                '{"queryType":"SELECT", "queryString":"SELECT OdaNumarasi,OdaDurumu,Aciklama,Tip,Fiyat' +
                ' FROM Odalar,OdaTipleri WHERE OdaTipiId=OdaTipId AND OdaId=' + this.id + '"}'
            );
            ipcRenderer.on('getRoomResponse', (err, response) => {
                this.room = ((JSON.parse(response || '') || {}) || [])[0] || {};
            });
        },
        components: {
            FullRoomCustomer,
            AddCustomerToRoom
        }
    }
</script>

<style>

</style>