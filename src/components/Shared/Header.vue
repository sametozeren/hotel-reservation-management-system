<template>
    <nav class="navbar navbar-color-on-scroll bg-dark fixed-top navbar-expand-lg" color-on-scroll="100">
        <div class="container-fluid">
            <div class="navbar-translate">
                <a class="navbar-brand" href="javascript:void(0)">
                    <div class="brand-image brand-big">
                        <img src="assets/img/hotel.svg" alt="logo" style="width: 70px; height:60px"
                            class="animated infinite swing">
                    </div>
                </a>

                <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="navbar-toggler-icon"></span>
                    <span class="navbar-toggler-icon"></span>
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a href="javascript:void(0)" class="nav-link">
                            <i class="material-icons">apps</i> Template
                        </a>
                    </li>
                </ul>
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