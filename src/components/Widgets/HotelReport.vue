<template>
    <div id="cardlist" class="row">
        <div class="col-md-4 col-lg-4 Card">
            <div class="bg-green ">
                <h3 class="CardText">Toplam Müşteri Sayısı</h3>
                <div class="row container">
                    <div class="col-md-10">
                        <h1 class="CardValue">200</h1>
                    </div>
                    <div class="col-md-2"><i class="fa fa-users fa-3x icons"></i></div>
                </div>
                <img src="assets/img/greenwave.svg">

            </div>
        </div>
        <div class="col-md-4 col-lg-4 Card">
            <div class="bg-red ">
                <h3 class="CardText">Dolu Oda Sayısı</h3>
                <div class="row container">
                    <div class="col-md-10">
                        <h1 class="CardValue">200</h1>
                    </div>
                    <div class="col-md-2"><img class="icons" src="assets/img/person-booth-solid.svg"></div>
                </div>
                <img src="assets/img/redwave.svg">
            </div>
        </div>
        <div class="col-md-4 col-lg-4 Card">
            <div class="bg-purple ">
                <h3 class="CardText">AYLIK TOPLAM gELİR</h3>
                <div class="row container">
                    <div class="col-md-10">
                        <h1 class="CardValue">200</h1>
                    </div>
                    <div class="col-md-2"><img class="icons" src="assets/img/money-bill-alt-regular.svg"></div>
                </div>
                <img src="assets/img/purplewave.svg">
            </div>
        </div>

    </div>
</template>

<script>
    export default {

    }
</script>

<style>


    #cardlist {
        margin: auto;
    }

    .bg-green {
        background: #1BC98E;
        border-radius: 5px;
    }

    .bg-red {
        background: #E64759;
        border-radius: 5px;
    }

    .bg-purple {
        background: #9F86FF;
        border-radius: 5px;
    }

    .Card {
        padding: 10px 15px 10px 15px;
    }

    .CardText {
        opacity: .7;
        font-size: .875rem;
        text-transform: uppercase;
        padding: 10px 10px 0px 10px;
        color: white;
        font-weight: 600;
    }

    .CardValue {
        display: inline-block;
        opacity: 0.9;
        font-size: 2.25rem;
        padding: 10px 10px 0px 10px;
        font-weight: bold;
        color: white;
    }

    .BtmSvg {
        fill: #50d5a8;
    }

    .icons {
        margin-top: 20px;
        margin-bottom: 10px;
        color: white;
    }
</style>