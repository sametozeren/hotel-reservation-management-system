<template>
    <h4 class="pl-4 pt-2 text-muted font-weight-bold">Müşteri Bilgilerini Düzenle {{id}}</h4>
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