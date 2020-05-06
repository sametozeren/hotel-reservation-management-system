<template>
    <div class="row">
        <div class="col-md-5">
            <div class="pl-4">
                <h4 class="pt-5 text-muted font-weight-bold">Oda Bilgileri</h4>
                <h5><b>Oda Numarası:</b> {{room.OdaNumarasi}}</h5>
                <h5><b>Oda Tipi:</b> {{room.Tip}}</h5>
                <h5><b>Oda Durumu:</b> <span class="Roomstatus"
                        :style="room.OdaDurumu ? 'background-color: green;':'background-color: red;'"></span></h5>
                <h5><b>Açıklama:</b> {{room.Aciklama}}</h5>
                <h5><b>Oda Kapasitesi:</b> {{room.OdaKapasitesi}} Kişi</h5>
            </div>

            <router-link tag="a" class="btn btn-primary ml-4" :to="{ name: 'roomEdit', params: { id : id}}">DÜZENLE
            </router-link>
            <router-link tag="a" class="btn btn-danger ml-4" :to="{ name: 'roomDelete', params: { id : id}}">SİL
            </router-link>
        </div>

        <div class="col-md-7">
            <FullRoomCustomer v-if="!room.OdaDurumu" />
            <AddCustomerToRoom v-else/>
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
                '{"queryType":"SELECT", "queryString":"SELECT OdaNumarasi,OdaDurumu,Aciklama,Tip,OdaKapasitesi' +
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
    .Roomstatus {
        display: inline-block;
        line-height: 26px;
        width: 20px;
        height: 20px;

        border-radius: 50%;
    }
</style>