<template>
    <header class="header">
        <nav class="navbar fixed-top">
            <div class="navbar-holder d-flex align-items-center align-middle justify-content-between">
                <div class="navbar-header">
                    <a href="db-social.html" class="navbar-brand">
                        <div class="brand-image brand-big">
                            <img src="assets/icons/hotel.svg" alt="logo" style="width: 60px; height:50px" class="logo-big animated infinite swing">
                        </div>
                        <div class="brand-image brand-small">
                            <img src="assets/icons/hotel.svg" alt="logo" style="width: 60px; height:50px" class="logo-small animated infinite swing">
                        </div>
                    </a>
                </div>
                <!-- End Logo -->
                <!-- Begin Navbar Menu -->
                <ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center pull-right">
                    <!-- User -->
                    <li class="nav-item dropdown"><a id="user" rel="nofollow" data-target="#" href="#"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link"><img
                                src="assets/img/avatar/avatar-01.jpg" alt="..." class="avatar rounded-circle"></a>
                        <ul aria-labelledby="user" class="user-size dropdown-menu">
                            <li class="welcome">
                                <a href="#" class="edit-profil"><i class="la la-gear"></i></a>
                                <img src="assets/img/avatar/avatar-01.jpg" alt="..." class="rounded-circle">
                            </li>
                            <li>
                                <a href="db-social.html" class="dropdown-item">
                                    Profile
                                </a>
                            </li>
                            <li>
                                <a href="app-mail.html" class="dropdown-item">
                                    Messages
                                </a>
                            </li>
                            <li>
                                <a href="#" class="dropdown-item no-padding-bottom">
                                    Settings
                                </a>
                            </li>
                            <li class="separator"></li>
                            <li>
                                <a href="pages-faq.html" class="dropdown-item no-padding-top">
                                    Faq
                                </a>
                            </li>
                            <li><a rel="nofollow" href="pages-login.html" class="dropdown-item logout text-center"><i
                                        class="ti-power-off"></i></a></li>
                        </ul>
                    </li>
                    <!-- End User -->
                    <!-- Begin Quick Actions -->
                    <li class="nav-item"><a href="#off-canvas" class="open-sidebar"><i class="la la-ellipsis-h"></i></a>
                    </li>
                    <!-- End Quick Actions -->
                </ul>
                <!-- End Navbar Menu -->
            </div>
            <!-- End Topbar -->
        </nav>
    </header>
</template>

<script>
    export default {

    }
</script>

<style>

</style>