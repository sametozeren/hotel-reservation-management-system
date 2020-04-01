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
        position: fixed;
        min-height: 100%;
        margin-top: 72px;
        padding-right: 0;
        padding-left: 0;
        margin-right: auto;
        width: calc(100% - 110px);
    }
</style>