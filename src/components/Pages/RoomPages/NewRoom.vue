<template>
  <div>
    <div class="row">
      <h4 class="pl-4 pt-2 text-muted font-weight-bold">Yeni Oda Ekle</h4>
    </div>
    <form @submit.prevent>
      <div class="row">
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Oda Numarası</label>
            <input type="text" class="form-control" v-model="newRoomNumber" placeholder="Örn. 201">
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Oda Tipi</label>
            <select class="form-control" v-model="roomTypeSelected">
              <option v-for="(roomType, index) in roomTypeList" :key="index" :value="roomType.OdaTipId">{{roomType.Tip}}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label for="exampleFormControlTextarea1">Açıklama</label>
            <textarea class="form-control" v-model="description" rows="3"></textarea>
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <router-link :to="{ name: 'roomList'}" tag="button" class="btn btn-default">Geri</router-link>
            <button class="btn btn-success" @click.prevent="newRoom()">Ekle</button>
          </div>
        </div>
      </div>
    </form>
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
        roomTypeList: [],
        roomTypeSelected: 1,
        newRoomNumber: '',
        description: '',
      }
    },
    methods: {
      newRoom() {
        if (this.newRoomNumber !== '' && this.description !== '') {
          ipcRenderer.send('newRoom',
            '{"queryType":"INSERT", "queryString":"INSERT INTO Odalar (OdaNumarasi, OdaTipiId, OdaDurumu, Aciklama) ' +
            'VALUES (\'' + this.newRoomNumber + '\',' + this.roomTypeSelected + ',1,\'' + this.description + '\')"}'
          );
          ipcRenderer.on('newRoomResponse', (err, response) => {
            this.roomTypeSelected = 1;
            this.newRoomNumber = '';
            this.description = '';

            if (response.indexOf('success') !== -1) {
              this.$toasted.success('Yeni Oda Başarıyla Kayıt Edildi.')
            }
          });
        } else {
          this.$toasted.error('Lütfen Tüm Alanları Eksiksiz Doldurun.')
        }
      },
    },
    created: function () {
      /*
          Oda tiplerini form elementine çekmek için yapılan işlemler
      */
      ipcRenderer.send('roomTypeList',
        '{"queryType":"SELECT", "queryString":"SELECT OdaTipId,Tip FROM OdaTipleri"}'
      );
      ipcRenderer.on('roomTypeListResponse', (err, response) => {
        this.roomTypeList = (JSON.parse(response || '') || {}) || [];
      });
    },
  }
</script>

<style>

</style>