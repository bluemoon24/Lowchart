# Lowcharts Demo

## First demo version

### Purpose of demo
There is not much behind this demo and it should not be taken as any kind of foundation or implementation pattern. Rather it is a little show case to prove how far we can get in a couple of days.

The architecture of the target library should go much further and far beyond this show case.

### Highchart interface
For this first chart was the simple "getting started" chart from the [Highchart documenation][0b5d0f66] was taken and a similar interface implemented.

This looks like this:

    var myChart = Highcharts.chart('container', {
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
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });

For the show case, 2 more series were created:

    ...
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

### Prerequisites
As requested, the library makes no assumptions on any framework, hence for the demo the only dependency is d3 vsn 4. The DOM container element must be an svg element, which will be used to hold the chart, for example:


    <div>
      <svg id='chart' class='chart' width="800" height="400"/>
    </div>

Assume the library is imported as 'lc'

    import * as lc from '<path-to-libdir>/Lowcharts.js'
then the chart is created with a simple function call:

    lc.chart('#chart', {
      chart: {
        type: 'bar'
      }, ... // more options as shown above

### Library functions
There is currently a single function exported, which is `chart (container, options)`, where `container` is the `svg` DOM element and `options` is an object to control initial properties for the chart.
The function also controls the chart types and looks like this:

    export function chart (container, options) {
      let opts = options.chart
      let chart = null
      let d3svg = d3.select(container)
      // TODO: check, if container is svg element
      let width = d3svg.attr('width') || 400
      let height = d3svg.attr('height') || 300
      options._width = width
      options._height = height
      switch (opts.type) {
        case 'bar':
          chart = barchart(d3svg, options)
          break
      }
      return chart
    }
`barchart` is an internal function that creates the barchart (or column chart).
Please refer to the source code, if you want to know more about the technical details.

It has the following features implemented:
 - Calculate bar width, depending on the number of series
 - Autoscale x and y axes
 - Autoselect a color scheme
 - Position chart and axes titles
 - Add an interactive legend, with text colors inherited by series colors.
 - A mouseover action for the legend texts that causes other series to transition (animated) to a faint style.


### Know bugs
The transition to lower the opacity when hovering the mouse over a legend causes unwanted behavior, when the transition does not come to an end, before the next transition starts. This is a minor detail, which can be fixed easily, but has no implication for the purpose of this demo.

### Documentation demo
This file has been generated with Markdown syntax and has been rendered to html with [Docute][d581ab6b]

  [0b5d0f66]: https://www.highcharts.com/docs/getting-started/your-first-chart "Highchart - Your First Chart"
  [d581ab6b]: https://docute.js.org/#/home "Docute MD Renderer"
