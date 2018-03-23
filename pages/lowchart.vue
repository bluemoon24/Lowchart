<template>
  <div>
    <svg id='chart' class='chart' width="800" height="400"/>
  </div>
</template>

<script>
  import * as lc from '~/components/Lowcharts/Lowcharts.js'
  // import from '~/components/Lowcharts/Lowcharts.js'

  export default {
    mounted: function () {
      this.createChart()
    },
    methods: {
      createChart: function () {
        let x = lc.chart('#chart', {
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Fruit Consumption'
          },
          xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
          },
          yAxis: {
            title: {
              text: 'Fruit eaten'
            }
          },
          series: [{
            name: 'Jane',
            data: [20, 10, 40]
          },
          {
            name: 'John',
            data: [5, 70, 13]
          },
          {
            name: 'Mike',
            data: [5, 30, 20]
          },
          {
            name: 'Molly',
            data: [5, 7, 3]
          }]
        })
        console.log(x)
      }
    }
  }
</script>

<style lang="stylus">
.chart rect
  fill steelblue

</style>
