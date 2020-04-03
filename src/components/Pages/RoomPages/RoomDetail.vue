<template>
    <div>
        <h4 class="pl-4 pt-2 text-muted font-weight-bold">Oda Detayları {{id}}</h4>
        <router-link tag="a" class="btn btn-primary ml-4" :to="{ name: 'roomEdit', params: { id : id}}">DÜZENLE</router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: this.$route.params.id,
            }
        },
    }
</script>

<style>

</style>