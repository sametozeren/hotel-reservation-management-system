<template>
    <div class="left-menu navbar bg-dark">
        <ul>
            <router-link to='/' tag="li">
                <a @mouseover="mouseMove($event)" @mouseleave="mouseLeave($event)">
                    <i class="material-icons menu-icons-size">home</i>
                    <span class="menu-item-text animated">Anasayfa</span>
                </a>
            </router-link>
            <router-link to="/rooms" tag="li">
                <a @mouseover="mouseMove($event)" @mouseleave="mouseLeave($event)" href="">
                    <i class="material-icons menu-icons-size">meeting_room</i>
                    <span class="menu-item-text animated">Odalar</span>
                </a>
            </router-link>
            <router-link to="/customers" tag="li">
                <a @mouseover="mouseMove($event)" @mouseleave="mouseLeave($event)" href="">
                    <i class="material-icons menu-icons-size">supervisor_account</i>
                    <span class="menu-item-text animated">Müşteriler</span>
                </a>
            </router-link>
            <router-link to="/reservationHistory" tag='li'>
                <a @mouseover="mouseMove($event)" @mouseleave="mouseLeave($event)" href="">
                    <i class="material-icons menu-icons-size">history</i>
                    <span class="menu-item-text animated">Rezervasyon Geçmişi</span>
                </a>
            </router-link>
            <router-link to="/invoice" tag='li'>
                <a @mouseover="mouseMove($event)" @mouseleave="mouseLeave($event)" href="">
                    <i class="material-icons menu-icons-size">receipt</i>
                    <span class="menu-item-text animated">Faturalar</span>
                </a>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                hover: false,
            };
        },
        methods: {
            mouseMove: (event) => {
                event.target.parentNode.querySelector('span').classList.remove('fadeOutDown')
                event.target.parentNode.querySelector('span').classList.add('fadeInUp')
            },
            mouseLeave: (event) => {
                event.target.parentNode.querySelector('span').classList.remove('fadeInUp')
                event.target.parentNode.querySelector('span').classList.add('fadeOutDown')
            },
        }

    }
</script>

<style>
    .left-menu {
        height: 100%;
        width: 110px;
        position: fixed;
    }

    .left-menu ul {
        list-style-type: none;
        width: 100%;
        padding: 0;
        margin: 0;
        vertical-align: middle;
    }

    .left-menu ul li {
        width: 100%;
        height: 100px;
        text-align: center;
        padding: 5px 0px 5px 0px;
        overflow: hidden;
    }

    .left-menu ul li span {
        display: block;
        opacity: 0;
        transition: .3s;
    }

    .left-menu ul li a {
        color: #fff;
        transition: .3s;
        font-weight: 700;
    }

    .left-menu ul li a:hover {
        color: #e91e63;
        transition: .3s;
    }

    .left-menu ul li a:hover span {
        opacity: 1;
        transition: .3s;
    }

    .bg-dark {
        box-shadow: none !important;
    }

    .menu-icons-size {
        font-size: 35px;
    }
</style>