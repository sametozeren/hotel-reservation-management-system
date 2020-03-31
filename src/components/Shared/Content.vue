<template>
    <div class='content container-fluid'>
        <!--CardRow-->
        <div id="cardlist" class="row">
            <div class="col-md-4 col-lg-4 Card">
                <div class="bg-green ">
                    <h3 class="CardText">Toplam Müşteri Sayısı</h3>
                    <h1 class="CardValue">200</h1>
                    <img src="assets/img/wave.svg">
                    
                </div>
            </div>
            <div class="col-md-4 col-lg-4 Card">
                <div class="bg-red ">
                    <h3 class="CardText">Dolu Oda Sayısı</h3>
                    <h1 class="CardValue">200</h1>
                    
                </div>
            </div>
            <div class="col-md-4 col-lg-4 Card">
                <div class="bg-purple ">
                    <h3 class="CardText">Boş Oda Sayısı</h3>
                    <h1 class="CardValue">200</h1>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .content {
        margin-left: 90px;
        position: fixed;
        min-height: 100%;
        margin-top: 72px;
        padding-right: 0;
        padding-left: 0;
        margin-right: auto;
        width: calc(100% - 90px);
    }

    #cardlist {
        margin: auto;
    }

    .bg-green {
        background: #1BC98E;
        border-radius: 5px;
        padding:5px;
    }

    .bg-red {
        background: #E64759;
    }

    .bg-purple {
        background: #9F86FF;
    }

    .Card {
        padding: 10px 15px 10px 15px;
        border-radius: 5px;
    }

    .CardText {
        opacity: .7;
        font-size: .875rem;
        text-transform: uppercase;
        margin: 10px 0 5px 0;
        color:white;
        font-weight: 600;
    }
    .CardValue{
        opacity: 0.9;
        font-size: 2.25rem;
        font-weight: bold;
        color:white;
    }
</style>