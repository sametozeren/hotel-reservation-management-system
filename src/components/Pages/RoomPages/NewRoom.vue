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
            <input type="text" class="form-control" id="exampleFormControlInput" placeholder="Örn. 201">
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label>Oda Tipi</label>
            <select class="form-control" id="exampleFormControlSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="col-md-6">
            <label for="exampleFormControlTextarea1">Açıklama</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
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
  const { ipcRenderer } = electron;

  export default {
    methods: {
      newRoom() {
        ipcRenderer.send('newRoom', 'triggerNewRoom');
      },
    },
  }

  ipcRenderer.on('todo:newItem',(err,data)=>{
    console.log(data)
  });
</script>

<style>

</style>