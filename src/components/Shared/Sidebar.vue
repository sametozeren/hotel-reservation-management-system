<template>
    <div class="left-menu navbar bg-dark">
        <ul>
            <li>
                <a @mouseover="mouseMove($event)" @mouseleave="mouseLeave($event)" href="">
                    <i class="fa fa-home fa-2x"></i>
                    <span class="menu-item-text animated">Home</span>
                </a>
            </li>
            <li>
                <a @mouseover="mouseMove($event)" @mouseleave="mouseLeave($event)" href="">
                    <i class="fa fa-home fa-2x"></i>
                    <span class="menu-item-text animated">Home</span>
                </a>
            </li>
            <li>
                <a @mouseover="mouseMove($event)" @mouseleave="mouseLeave($event)" href="">
                    <i class="fa fa-home fa-2x"></i>
                    <span class="menu-item-text animated">Home</span>
                </a>
            </li>
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
        width: 90px;
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
</style>