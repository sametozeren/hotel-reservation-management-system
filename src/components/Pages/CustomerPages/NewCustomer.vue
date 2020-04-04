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
            <input type="text" class="form-control" id="exampleFormControlInput" placeholder="Örn. Yasin">
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Müşteri Soyadı</label>
            <input type="text" class="form-control" id="exampleFormControlInput" placeholder="Örn. ES">
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Ülke</label>
            <select class="form-control select-box-color" id="exampleFormControlSelect">
              <option>Türkiye</option>
              <option v-for="(ulke, index) in ulkeList" :key="index" :value="ulke.UlkeId">{{ulke.UlkeAdi}}</option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Cep Telefonu</label>
            <input type="text" class="form-control" id="exampleFormControlInput" placeholder="Örn. 0555 555 00 00">
          </div>
        </div>
        <div class="form-group col-md-12 bmd-form-group is-filled">
          <div class="col-md-6">
            <label for="date">Doğum Tarihi</label>
            <DatePicker></DatePicker>
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Kimlik Numarası</label>
            <input type="text" class="form-control" id="exampleFormControlInput" placeholder="Örn. 49398920194 ">
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Kimlik Tipi</label>
            <select class="form-control select-box-color" id="exampleFormControlSelect">
              <option>Türkiye</option>
              <option>ABD</option>
              <option>İNG.</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <router-link :to="{ name: 'customerList'}" tag="button" class="btn btn-default">Geri</router-link>
            
          </div>
        </div>
      </div>
    </form>
    <button class="btn btn-success" @click="ulkelerUpdate()">Ekle</button>
  </div>
</template>

<script>
  import DatePicker from 'vuejs-datepicker';
  import Store from 'electron-store';

  const store = new Store();

  export default {
    data() {
      return {
        ulkeList: (JSON.parse(store.get('ulkeler') || '{}') || []).recordset || [],
      }
    },
    components: {
      DatePicker,
    },
    methods:{
      ulkelerUpdate(){
        this.ulkeList.push({
          UlkeId:'5000',
          UlkeAdı:'samet',
        });

        store.set('ulkeler',[]);
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