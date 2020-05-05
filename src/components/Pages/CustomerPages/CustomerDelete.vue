<template>
  <div>
    <h4 class="pl-4 pt-5 text-muted font-weight-bold">Müşteriyi silmek istediğinizden emin misiniz? Bu işlem geri
      alınamaz!</h4>
    <a class="btn btn-primary ml-4 text-white" @click="deleteCustomer()">Sil</a>
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
      deleteCustomer() {
        ipcRenderer.send('deleteCustomer',
          '{"queryType":"DELETE", "queryString":"DELETE FROM Musteriler WHERE MusteriId=' + this.id + '"}'
        );

        ipcRenderer.on('deleteCustomerResponse', (err, response) => {
          if (response === 'success') {
            this.$toasted.success('Kullanıcı Başarıyla Silindi');
            this.$router.push({ name: 'customerList' });
          } else {
            this.$toasted.error('Kullanıcı Maalesef Silinemedi')
          }
        });
      }
    },
  }
</script>

<style>

</style>