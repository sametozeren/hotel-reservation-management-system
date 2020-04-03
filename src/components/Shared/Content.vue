<template>
    <div class='content container-fluid'>
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
    
    }
</script>

<style>
    .content {
        margin-left: 110px;
        position: relative;
        min-height: 100%;
        margin-top: 72px;
        width: calc(100% - 110px);
    }
</style>