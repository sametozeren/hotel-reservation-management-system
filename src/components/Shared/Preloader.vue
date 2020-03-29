<template>
    <div id="preloader" :class="{ preloader : !isVisible }">
        <div class="canvas">
            <h1>Uygulama Açılıyor Lütfen Bekleyin...</h1>
            <div class="spinner"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                isVisible: true,
            };
        },
        methods: {
            preLoader: function () {
                setTimeout(() => {
                    return this.isVisible = false;
                }, 3000);
            }
        },
        mounted: function () {
            this.preLoader()
        },
    }
</script>

<style>
    .preloader {
        display: none;
    }
</style>