<template>
  <div class="row">
    <h2 class="pl-4 text-muted font-weight-bold">Odalar</h2>
    <div class="col-md-12">
      <div class="container-fluid">
        <div class="row">
          <router-link v-for="(room, index) in rooms" tag="a" :to="{ name: 'roomdetail', params: { id : room.id}}"
            :key="index" class="btn btn-danger p-5 m-2 col-md-1">
            {{room.no}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rooms: [{
            id: 1,
            no: '200'
          },
          {
            id: 2,
            no: '201'
          },
          {
            id: 3,
            no: '202'
          },
          {
            id: 4,
            no: '203'
          },
          {
            id: 5,
            no: '204'
          },
          {
            id: 6,
            no: '205'
          },
          {
            id: 7,
            no: '206'
          },
          {
            id: 8,
            no: '207'
          },
          {
            id: 9,
            no: '208'
          },
          {
            id: 10,
            no: '209'
          },
          {
            id: 11,
            no: '210'
          },
          {
            id: 12,
            no: '211'
          },
          {
            id: 13,
            no: '212'
          },
          {
            id: 14,
            no: '213'
          },
          {
            id: 15,
            no: '214'
          },
          {
            id: 16,
            no: '215'
          },
          {
            id: 17,
            no: '216'
          },
          {
            id: 18,
            no: '217'
          },
        ]
      }
    },
    components: {}
  }
</script>

<style>

</style>