<template>
  <div class="row">
        <h2 class="pl-4 mb-0 text-muted font-weight-bold">Oda Bilgileri</h2>
        <div class="col-md-12">
            <h1 class="pl-3">{{id}}</h1>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id: this.$route.params.id,
        }
    },
}
</script>

<style>

</style>