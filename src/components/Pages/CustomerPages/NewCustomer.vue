<template>
  <div>
    <div class="row">
      <h4 class="pl-4 pt-2 text-muted font-weight-bold">Yeni Müşteri Ekle</h4>
    </div>
    <form>
      <div class="row">
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Müşteri Adı</label>
            <input type="text" class="form-control" v-model="name" placeholder="Örn. Yasin">
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Müşteri Soyadı</label>
            <input type="text" class="form-control" v-model="surname" placeholder="Örn. ES">
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Ülke</label>
            <select class="form-control select-box-color" v-model="selectedCountry">
              <option v-for="(country, index) in countryList" :key="index" :value="country.UlkeId">{{country.UlkeAdi}}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Cep Telefonu</label>
            <input type="text" class="form-control" v-model="phoneNumber" placeholder="Örn. 0555 555 00 00">
          </div>
        </div>
        <div class="form-group col-md-12 bmd-form-group is-filled">
          <div class="col-md-6">
            <label for="date">Doğum Tarihi</label>
            <DatePicker v-model="dateOfBirth"></DatePicker>
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Kimlik Numarası</label>
            <input type="text" class="form-control" v-model="identityNumber" placeholder="Örn. 49398920194 ">
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Kimlik Tipi</label>
            <select class="form-control select-box-color" v-model="selectedIdentity">
              <option v-for="(identity, index) in identityList" :key="index" :value="identity.KimlikTipiId">
                {{identity.KimlikTipi}}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <router-link :to="{ name: 'customerList'}" tag="button" class="btn btn-default">Geri</router-link>
            <button class="btn btn-success" @click.prevent="newCustomer()">Ekle</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import DatePicker from 'vuejs-datepicker';
  const electron = require('electron');
  const {
    ipcRenderer
  } = electron;

  export default {
    data() {
      return {
        countryList: [],
        identityList: [],
        selectedCountry: 1,
        selectedIdentity: 1,
        name: '',
        surname: '',
        phoneNumber: '',
        dateOfBirth: '',
        identityNumber: '',
        newDateOfBirth:'',
      }
    },
    created: function () {
      /*
          Ülkeleri form elementine çekmek için yapılan işlemler
      */
      ipcRenderer.send('countryList',
        '{"queryType":"SELECT", "queryString":"SELECT * FROM Ulkeler"}'
      );
      ipcRenderer.on('countryListResponse', (err, response) => {
        this.countryList = (JSON.parse(response || '') || {}) || [];
      });

      /*
          Kimlik tiplerini form elementine çekmek için yapılan işlemler
      */
      ipcRenderer.send('identityList',
        '{"queryType":"SELECT", "queryString":"SELECT * FROM KimlikTipleri"}'
      );
      ipcRenderer.on('identityListResponse', (err, response) => {
        this.identityList = (JSON.parse(response || '') || {}) || [];
      });
    },
    components: {
      DatePicker,
    },
    methods: {
      newCustomer() {
        if (this.name !== '' && this.surname !== '' && this.phoneNumber !== '' && this.dateOfBirth !== '' && this
          .identityNumber !== '') {
          ipcRenderer.send('newCustomer',
            '{"queryType":"INSERT", "queryString":"INSERT INTO Musteriler (Ad, Soyad, UlkeId, TelNo, DogumTarihi,' +
            ' KimlikNumarasi, KimlikTipiId) ' + 'VALUES (\'' + this.name + '\',\'' + this.surname + '\',' +
            this.selectedCountry + ',\'' + this.phoneNumber + '\',\'' + this.newDateOfBirth + '\',\'' +
            this.identityNumber + '\',' + this.selectedIdentity + ')"}'
          );
          ipcRenderer.on('newCustomerResponse', (err, response) => {
            this.name = ''
            this.surname = '';
            this.phoneNumber = '';
            this.dateOfBirth = '';
            this.identityNumber = '';

            if (response.indexOf('success') !== -1) {
              this.$toasted.success('Yeni Müşteri Başarıyla Kayıt Edildi.')
            }
          });
        } else {
          this.$toasted.error('Lütfen Tüm Alanları Eksiksiz Doldurun.')
        }
      },
    },
    watch: {
      dateOfBirth() {
        var newDateArray = this.dateOfBirth.toString().split(' ');

        this.newDateOfBirth = newDateArray[2] + '.' + newDateArray[1] + '.' + newDateArray[3];
      }
    }
  }
</script>

<style>
  .vdp-datepicker input {
    background-color: #f2f2f2;
    border: 1px solid #c7c0c0;
  }
</style>