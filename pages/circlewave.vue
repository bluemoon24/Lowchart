<template>
  <div>
    <!-- {{ windowSize }}, {{ initialWSize }} -->
    <v-layout v-resize="onResize" row wrap fluid>
    <v-flex xs4>
      <v-switch v-for="col in cols" :key="col.label"
        :value="col.color"
        :label="col.label"
        :color="col.scolor"
        v-model="selected"
      ></v-switch>
      <v-slider hint="Radius" thumb-label dark persistent-hint v-model="radius" step="10" max="250"></v-slider>
      <v-slider hint="Stroke" thumb-label dark persistent-hint v-model="strokewidth" step="1" min="1" max="15"></v-slider>
      <v-slider hint="Speed" thumb-label dark persistent-hint v-model="slowness" step="1" min="1" max="10000"></v-slider>
      <v-slider hint="Corona" thumb-label dark persistent-hint v-model="amplitude" step="1" max="128"></v-slider>
      <v-btn @click="resetit">Reset to defaults</v-btn>
    </v-flex>

    <v-flex xs8>
      <circle-wave
        :data="selected"
        :svgwidth="svgwidth"
        :svgheight="svgheight"
        :radius="radius"
        :strokewidth="strokewidth"
        :amplitude="amplitude"
        :slowness="speed"
        :translate="this.translate"
        :scale="this.scale"
        ></circle-wave>
    </v-flex>
  </v-layout>
    <!-- <data-chart></data-chart> -->
  </div>
</template>

<script>
  // import colors from 'vuetify/es5/util/colors'
  import CircleWave from '~/components/CircleWave.vue'
  import DataChart from '~/components/DataChart.vue'
  export default {
    components: {
      CircleWave, DataChart
    },
    computed: {
      speed: function () {
        return this.slowness / 500
      }
    },
    mounted () {
      this.resetit()
      // this.translate = [this.svgwidth / 2, this.svgheight / 2]
      // console.log('+++', this.translate, this.svgwidth, this.initialWSize)
    },
    methods: {
      resetit: function () {
        this.selected = ['cyan', 'magenta', 'yellow']
        this.radius = 200
        this.strokewidth = 10
        this.amplitude = 32
        this.slowness = 500
      },
      onResize: function () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        if (!this.initialWSize || this.initialWSize.length <= 0) this.initialWSize = { x: window.innerWidth, y: window.innerHeight }
        console.log('**** onResize', this.windowSize, this.initialWSize)
        this.scale = [this.windowSize.x / this.initialWSize.x, this.windowSize.y / this.initialWSize.y]
        this.svgwidth = this.windowSize.x * 0.6 * this.scale[0]
        this.svgheight = this.windowSize.y * 0.6 * this.scale[1]
        let scale = Math.min(this.scale[0], this.scale[1])
        this.scale = [scale, scale]
        this.translate = [this.svgwidth / 2, this.svgheight / 2]
      }
    },
    data: () => ({
      cols: [
        { label: 'Cyan', color: 'cyan', scolor: 'cyan' },
        { label: 'Magenta', color: 'magenta', scolor: 'purple accent-1' }, // vuetify doesn't know 'magenta' and ignores '#ff00ff'
        { label: 'Yellow', color: 'yellow', scolor: 'yellow' }
      ],
      selected: [],
      radius: 0,
      strokewidth: 0,
      amplitude: 0,
      slowness: 0,
      svgwidth: 960,
      svgheight: 600,
      windowSize: [],
      initialWSize: [],
      translate: [0, 0],
      scale: [1.0, 1.0]
    })
  }
</script>

<style scoped>

</style>
