<template>
  <div class="row">
    <h4 class="pl-4 pt-2 text-muted font-weight-bold">Odalar</h4>
    <div class="col-md-12 pl-4">
      <router-link tag="a" class="btn btn-success" :to="{name:'newRoom'}">Yeni Oda Ekle</router-link>
    </div>
    <div class="col-md-12">
      <div class="container-fluid">
        <div class="row">
          <router-link v-for="(room, index) in roomList" tag="a"
            :to="{ name: 'roomDetail', params: { id : room.OdaId}}" :key="index" class="btn p-5 m-2 col-md-1"
            :class="{'btn-info':room.OdaDurumu,'btn-danger':!room.OdaDurumu}"
            :title="room.OdaDurumu ? 'Boş Oda':'Dolu Oda'">
            {{room.OdaNumarasi}}
          </router-link>
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
        roomList: []
      }
    },
    created: function () {
      /* 
        Oda listesini çekmek için yapılan işlemler 
      */
      ipcRenderer.send('roomList',
        '{"queryType":"SELECT", "queryString":"SELECT OdaId,OdaNumarasi,OdaDurumu FROM Odalar"}'
      );
      ipcRenderer.on('roomListResponse', (err, response) => {
        this.roomList = (JSON.parse(response || '') || {}) || [];
      });
    },
  }
</script>

<style>

</style>