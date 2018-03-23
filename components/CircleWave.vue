<template>
  <div>
    {{ transform }}
    <v-toolbar flat dense dark>
    <v-spacer />
      <v-btn @click="(timer ? stop() : start())">{{ timer ? 'Stop' : 'Start' }}</v-btn>
    <v-spacer />
    </v-toolbar>
  <svg :width="svgwidth" :height="svgheight">
  </svg>
</div>
</template>

<script>
  import * as d3 from 'd3'
  export default {
    props: {
      data: {
        type: Array,
        default: () => (['cyan', 'magenta', 'yellow'])
      },
      svgwidth: {
        type: Number,
        default: 960
      },
      svgheight: {
        type: Number,
        default: 500
      },
      radius: {
        type: Number,
        default: 200
      },
      strokewidth: {
        type: Number,
        default: 10
      },
      amplitude: {
        type: Number,
        default: 32
      },
      slowness: {
        type: Number,
        default: 1000
      },
      translate: {
        type: Array,
        default: () => ([0.0, 0.0])
      },
      scale: {
        type: Array,
        default: () => ([1.0, 1.0])
      },
      rotate: {
        type: Array,
        default: () => ([0.0, 0.0, 0.0])
      }
      // series: {
      //   type: Array
      // }
    },
    name: 'circle-wave',
    data: () => ({
      g: '',
      path: '',
      timer: null,
      d3svg: null
    }),
    computed: {
      getData: () => (this.data),
      angles: () => d3.range(0, 2 * Math.PI, Math.PI / 200),
      transform: function () {
        return 'translate(' + this.translate.join(',') + ') ' +
        'rotate(' + this.rotate.join(',') + ') ' +
        'scale(' + this.scale.join(',') + ')'
      }
    },
    watch: {
      'data': 'updateChart',
      'translate': 'updateTransform',
      'scale': 'updateTransform',
      'rotate': 'updateTransform'
    },
    created: function () {
    },
    mounted () {
      this.d3svg = d3.select('svg')
      /* eslint {indent: off} */
      this.g = this.d3svg.append('g')
        .attr('transform', this.transform)
        .attr('fill', 'none')
        .attr('stroke-width', this.strokewidth)
        .attr('stroke-linejoin', 'round')

      this.path = this.g.selectAll('path')
        .data(this.data)
        .enter().append('path')
    },
    methods: {
      start: function () {
        let that = this
        this.d3svg.selectAll('g').remove()
        this.g = this.d3svg.append('g')
          .attr('transform', this.transform)
          .attr('fill', 'none')
          .attr('stroke-width', this.strokewidth)
          .attr('stroke-linejoin', 'round')

        this.path = this.g.selectAll('path')
          .data(this.data)
          .enter().append('path')

        this.updateChart()

        this.timer = d3.timer(function () {
          that.g.attr('stroke-width', that.strokewidth)
          that.path.attr('d', function (d) {
            return d(that.angles)
          })
          that.path.datum(function (d, i) {
            return d3.lineRadial()
              .curve(d3.curveLinearClosed)
              .angle(function (a) { return a })
              .radius(function (a) {
                var t = that.slowness * d3.now() / 1000
                return that.radius + Math.cos(a * 8 - i * 2 * Math.PI / 3 + t) * Math.pow((1 + Math.cos(a - t)) / 2, 3) * that.amplitude
            })
          })
        })
      },
      stop: function () {
        this.timer.stop()
        this.timer = null
      },
      updateTransform: function () {
        this.g.attr('transform', this.transform)
      },
      updateChart: function () {
        let that = this
        console.log('updateChart', this.data)
        this.path = this.g.selectAll('path')
          .data(this.data)

        this.path.exit().remove()

        this.path = this.path.enter().append('path').merge(this.path)
        .attr('stroke', function (d) { return d })
          .style('mix-blend-mode', 'darken')
          .datum(function (d, i) {
            return d3.lineRadial() // radialLine() renamed to lineRadial
              .curve(d3.curveLinearClosed)
              .angle(function (a) { return a })
              .radius(function (a) {
                var t = that.slowness * d3.now() / 1000
                return that.radius + Math.cos(a * 8 - i * 2 * Math.PI / 3 + t) * Math.pow((1 + Math.cos(a - t)) / 2, 3) * that.amplitude
              })
          })
      }
    }
  }
</script>

<style scoped>

</style>
