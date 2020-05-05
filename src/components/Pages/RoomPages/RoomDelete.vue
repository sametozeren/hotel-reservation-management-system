<template>
  <div>
    <h4 class="pl-4 pt-5 text-muted font-weight-bold">Odayı silmek istediğinizden emin misiniz? Bu işlem geri
      alınamaz!</h4>
     <a class="btn btn-primary ml-4 text-white" @click="deleteRoom()">Sil</a>
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
      }
    },
    methods: {
      deleteRoom() {
        ipcRenderer.send('deleteRoom',
          '{"queryType":"DELETE", "queryString":"DELETE FROM Odalar WHERE OdaId=' + this.id + '"}'
        );

        ipcRenderer.on('deleteRoomResponse', (err, response) => {
          if (response === 'success') {
            this.$toasted.success('Oda Başarıyla Silindi');
            this.$router.push({ name: 'roomList' });
          } else {
            this.$toasted.error('Oda Maalesef Silinemedi')
          }
        });
      }
    },
  }
</script>

<style>

</style>