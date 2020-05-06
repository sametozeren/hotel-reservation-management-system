<template>
    <div id="cardlist" class="row">
        <div class="col-md-4 col-lg-4 Card">
            <div class="bg-green ">
                <h3 class="CardText">Toplam Müşteri Sayısı</h3>
                <div class="row container">
                    <div class="col-md-10">
                        <h1 class="CardValue">{{totalCustomer}}</h1>
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
                        <h1 class="CardValue">{{roomRatio}}</h1>
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
                        <h1 class="CardValue">{{monthPerPrice}}</h1>
                    </div>
                    <div class="col-md-2"><img class="icons" src="assets/img/money-bill-alt-regular.svg"></div>
                </div>
                <img src="assets/img/purplewave.svg">
            </div>
        </div>

    </div>
</template>

<script>
    const electron = require('electron');
    const {
        ipcRenderer
    } = electron;
    const date = new Date();

    export default {
        data() {
            return {
                totalCustomer: 0,
                roomRatio: 0,
                monthPerPrice: 0,
            }
        },
        created: function () {
            /*
                Anasayfa üzerinde otelde aktif olarak konaklayan toplam müşteri sayısını göstermek için yapılan işlemler
            */
            ipcRenderer.send('totalCustomer',
                '{"queryType":"SELECT", "queryString":"SELECT COUNT(MusteriId) AS totalCustomer FROM Musteriler"}'
            );
            ipcRenderer.on('totalCustomerResponse', (err, response) => {
                this.totalCustomer = ((JSON.parse(response || '') || {})[0] || {}).totalCustomer || 0;
            });

            /*
                Anasayfa üzerinde otelde aktif olarak kullanılan oda sayısını göstermek için yapılan işlemler
            */
            ipcRenderer.send('roomRatio',
                '{"queryType":"SELECT", "queryString":"SELECT COUNT(OdaId) AS roomRatio FROM Odalar WHERE OdaDurumu=0"}'
            );
            ipcRenderer.on('roomRatioResponse', (err, response) => {
                this.roomRatio = ((JSON.parse(response || '') || {})[0] || {}).roomRatio || 0;
            });

            /*
                Anasayfa üzerinde otelin sorgulama yapılan tarihe göre bulunulan ay içerisinde ki gelirini göstermek için yapılan işlemler
            */
            ipcRenderer.send('monthPerPrice',
                '{"queryType":"SELECT", "queryString":"SELECT SUM(ToplamFiyat) AS monthPerPrice FROM Faturalar Where ' +
                'DATEPART(MONTH, Tarih)=' + (date.getMonth() + 1) + ' AND DATEPART(YEAR,Tarih)=' + date
                .getUTCFullYear() + '"}'
            );
            ipcRenderer.on('monthPerPriceResponse', (err, response) => {
                this.monthPerPrice = ((JSON.parse(response || '') || {})[0] || {}).monthPerPrice || 0;
            });
        },
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