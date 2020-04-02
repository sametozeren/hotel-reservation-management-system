<template>
  <div id="pieReport" class="row">
    <div class="col-md-6 col-lg-12">
      <GChart type="ColumnChart" :data="chartData" :options="chartOptions" :resizeDebounce="500" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // Array will be automatically processed with visualization.arrayToDataTable function
        chartData: [
          ['Year', 'Sales', 'Expenses', 'Profit'],
          ['2014', 1000, 400, 200],
          ['2015', 1170, 460, 250],
          ['2016', 660, 1120, 300],
          ['2017', 1030, 540, 350]
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