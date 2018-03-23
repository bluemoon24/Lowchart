<template>
    <v-layout v-resize="onResize" column align-center justify-center>
      <v-subheader>Window Size</v-subheader>
      {{ windowSize }}
      <v-subheader>SVG Size</v-subheader>
      {{ svgwidth }}, {{ svgheight }}
      <svg ref="svg" :width="svgwidth" :height="svgheight">
      </svg>
    </v-layout>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    // props: {
      // type: {
      //   type: String
      // },
      // series: {
      //   type: Array
      // }
    // },
    name: 'data-chart',
    data: () => ({
      d3svg: null,
      g: null,
      d3data: [],
      transform: '',
      svgwidth: 0,
      svgheight: 0,
      initialx: 0,
      initialy: 0,
      scalex: 1.0,
      scaley: 1.0,
      windowSize: {
        x: 0,
        y: 0
      }
    }),

    computed: {
    },

    created: function () {
    },

    mounted () {
      console.log('***** mounted ******')

      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      this.initialx = this.windowSize.x * 0.8
      this.initialy = this.windowSize.y * 0.5
      this.draw()
      // this.onResize()
    },
    methods: {
      draw: function () {
        this.transform = 'translate(' + this.initialx / 2 + ',' + this.initialy / 2 + ') ' +
          'scale(' + this.scalex + ', ' + this.scaley + ')'

        this.d3svg = d3.select('svg')
        // this.svgwidth = +this.d3svg.attr('width')
        // this.svgheight = +this.d3svg.attr('height')
        /* eslint {indent: off} */
        this.g = this.d3svg.append('g')
          .attr('transform', this.transform)
          .attr('fill', 'yellow')
          .attr('stroke-width', 1)

        let circle = this.g.selectAll('circle')
          .data([200, 57, 100], function (d) { return d })

        circle.enter().append('circle')
          .attr('cy', 0)
          .attr('cx', function (d, i) { return i * 100 - 100 })
          .attr('r', function (d) { return Math.sqrt(d) })

        circle.exit().remove()
      },
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        this.svgwidth = this.windowSize.x * 0.8
        this.svgheight = this.windowSize.y * 0.5
        if (this.initialx !== 0) this.scalex = this.svgwidth / this.initialx
        if (this.initialy !== 0) this.scaley = this.svgheight / this.initialy
        let scale = Math.min(this.scalex, this.scaley)
        this.transform = 'translate(' + this.svgwidth / 2 + ',' + this.svgheight / 2 + ') ' +
          'scale(' + scale + ', ' + scale + ')'
        if (this.g) this.g.attr('transform', this.transform)
      }
    }
  }
</script>

<style scoped>

</style>
