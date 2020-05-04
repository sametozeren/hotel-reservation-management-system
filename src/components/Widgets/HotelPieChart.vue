<template>
  <div id="pieReport" class="row pt-5">
    <div class="col-md-6 col-lg-12">
      <GChart type="ColumnChart" :data="chartData" :options="chartOptions" :resizeDebounce="500" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        chartData: [
          ['AY', 'Toplam Müşteri Sayısı', 'Toplam Kazanç'],
          ['Şubat', 1000, 400],
          ['Mart', 1170, 460],
          ['Nisan', 660, 1120],
          ['Mayıs', 1030, 540]
        ],
        chartOptions: {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          },
        }
      }
    }
  }
</script>

<style>
  #pieReport svg>rect {
    fill: #f2f2f2;
  }
</style>