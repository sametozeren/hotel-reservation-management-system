<template>
    <nav class="navbar bg-dark fixed-top">
        <div class="container-fluid">
            <div class="navbar-translate">
                <router-link to='/' tag="a" class="navbar-brand">
                    <div class="brand-image brand-big">
                        <img src="assets/img/hotel.svg" alt="logo" style="width: 70px; height:60px"
                            class="animated infinite swing">
                    </div>
                </router-link>
            </div>
            <div id="container-menu">
                <div id="buttons-menu">
                    <div id="minimize" @click="menuMinimizedBtnClicked()">
                        <span>-</span>
                    </div>
                    <div id="close" @click="menuClosedBtnClicked()">
                        <span>&times;</span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    const electron = require('electron');

    const {ipcRenderer} = electron;

    export default {
        methods: {
            menuMinimizedBtnClicked:() => {
            },
            menuClosedBtnClicked:() => {
                ipcRenderer.send('menuClosedBtnClicked');
            }
        }
    }
</script>

<style>
    .navbar {
        border-radius: 0px;
        box-shadow: none;
    }

    #container-menu {
        display: block;
        width: 10%;
        margin-right: -60px;
        background-color: #222222;
    }

    #container-menu #titleShown {
        width: 30%;
        height: 100%;
        line-height: 30px;
        color: #f7f7f7;
        font-size: 1.2em;
        font-weight: bold;
        float: left;
        padding: 0 0 0 1em;
    }

    #container-menu #buttons-menu {
        float: right;
        width: 130px;
        height: 100%;
        line-height: 30px;
        background-color: #222222;
    }

    #container-menu #buttons-menu span {
        padding: 0px 7px 1px 7px;
        border-radius: 60px;
        font-weight: bold;
    }

    #buttons-menu #minimize,
    #buttons-menu #close {
        float: left;
        height: 100%;
        width: 20%;
        text-align: center;
        color: #f7f7f7;
        transition: all ease-in-out .2s;
        cursor: pointer;
    }

    #buttons-menu #minimize span {
        background-color: #f3c623;
        color: #f3c623;
    }

    #buttons-menu #minimize span:hover {
        background-color: #f3c623;
        color: #fff;
    }

    #buttons-menu #close span {
        background-color: #dd2c00;
        color: #dd2c00;
    }

    #buttons-menu #close span:hover {
        background-color: #dd2c00;
        color: #fff;
    }
</style>