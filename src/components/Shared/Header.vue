<template>
    <nav class="navbar navbar-color-on-scroll bg-dark fixed-top navbar-expand-lg" color-on-scroll="100">
        <div class="container-fluid">
            <div class="navbar-translate">
                <router-link to='/' tag="a" class="navbar-brand">
                    <div class="brand-image brand-big">
                        <img src="assets/img/hotel.svg" alt="logo" style="width: 70px; height:60px"
                            class="animated infinite swing">
                    </div>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {

    }
</script>

<style>
    .navbar {
        border-radius: 0px;
        box-shadow: none;
    }
</style>