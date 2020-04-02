<template>
    <div class="row">
        <h3 class="pl-4 pt-3 ml-2 mb-0 text-muted font-weight-bold">Anasayfa</h3>
        <div class="col-md-12">
            <HotelReport />
        </div>
        <div class="col-md-12">
            <HotelPieChart />
        </div>
    </div>
</template>

<script>
    import HotelReport from '../Widgets/HotelReport'
    import HotelPieChart from '../Widgets/HotelPieChart'

    export default {
        components: {
            HotelReport,
            HotelPieChart
        }
    }
</script>

<style>

</style>