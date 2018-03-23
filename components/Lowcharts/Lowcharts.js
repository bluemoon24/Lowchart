import * as d3 from 'd3'

function barchart (svg, options) {
    // let props = ['series', 'title', 'xAxis', 'yAxis']
    // let colors = ['steelblue', 'teal', 'salmon', 'seagreen', 'plumb', 'peru']
    var color = d3.scaleOrdinal(d3.schemeCategory20b)

    console.log('Barchart', options)
    // let data = [4, 8, 15, 16, 23, 42]

    // let data = options.series[0].data

    /* eslint {indent: off} */
    let margin = {top: 40, right: 30, bottom: 50, left: 40}
    let width = options._width - margin.left - margin.right
    let height = options._height - margin.top - margin.bottom

    let nseries = options.series.length

    console.log('Series', nseries, options.series.map(el => el.name))
    let alldata = []
    for (var i = 0; i < options.series.length; i++) {
      alldata = alldata.concat(options.series[i].data)
    }

    console.log('All data', alldata)

    // let x = d3.scaleOrdinal()
    //     .rangeRoundBands([0, width], 0.1)
    //
    let x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.2)

    let y = d3.scaleLinear()
        .range([height, 0])

    let xAxis = d3.axisBottom(x)

    let yAxis = d3.axisLeft(y)

    let chart = d3.select('.chart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      x.domain(options.xAxis.categories)
      y.domain([0, d3.max(alldata, function (d) { return d })])

      chart.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis)

      chart.append('g')
          .attr('class', 'y axis')
          .call(yAxis)

      for (let ser = 0; ser < options.series.length; ser++) {
        let spoint = options.series[ser]
        let bar = 'bar' + ser
        console.log('data', spoint)
        // console.log('color', ser % nseries, colors[ser % nseries])
        chart.selectAll(bar)
            .data(spoint.data)
          .enter().append('rect')
            .attr('class', bar + ' series')
            .attr('x', function (d, i) {
              console.log('xxxxxx', i, x(options.xAxis.categories[i]) + x.bandwidth() / options.series.length)
              return x(options.xAxis.categories[i]) + ser * x.bandwidth() / options.series.length
            })
            .attr('y', (d) => (y(d)))
            .attr('height', function (d) { return height - y(d) })
            .attr('width', 0.9 * x.bandwidth() / options.series.length)
            .style('fill', function (d, i) { return color(spoint.name) })
      }

        chart.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .attr('fill', 'black')
          .text(options.yAxis.title.text)

    let t = d3.transition()
    .duration(1000)
    .ease(d3.easeLinear)

    chart.insert('g')
          .attr('class', 'legend')
          .selectAll('.legend-text')
            .data(options.series.map(el => el.name))
          .enter().append('text')
          .attr('fill', (d) => (color(d)))
          .text(d => (d))
          .attr('x', (d, i) => (i * 100))
          .attr('y', height + 40)
          .on('mouseover', function (e, i) {
            console.log('mouseover event', e)
            // let bar = d3.selectAll('.bar' + i)
            d3.selectAll('.series').filter(function (d, j) {
              return !d3.select(this).classed('bar' + i)
            }).transition(t)
              .style('opacity', 0.1)
            // bar.style('opacity', 1)
            // .transition(t)
            //   .style('fill', 'red')
          })
          .on('mouseout', (e, i) => {
            // console.log('mouseout', e, i)
            d3.selectAll('.series')
              .transition(t)
                .style('opacity', 1)
          })

    d3.select('.legend')
          .attr('transform', 'translate(' + (width - nseries * 100) / 2 + ')')
    // d3.touch(container[, touches], identifier)

    let el = chart.append('g')
          .attr('class', 'title')
          .attr('fill', 'black')
        .append('text')
          .text(options.title.text)

      let tl = 0

        // console.log('getComputedTextLength', tl)
      el.attr('class', function () {
          tl = this.getComputedTextLength()
        console.log('getComputedTextLength', tl)
        return 'title-text'
      })

      // let tl = 100 // TODO: calculate text lenght w/ getComputedTextLength or other
      el.attr('x', (width - tl) / 2)
        .attr('y', -10)
    return chart
  }

export function chart (container, options) {
  console.log('options', container, options)
  let opts = options.chart
  let chart = null
  let d3svg = d3.select(container)
  // TODO: check, if container is svg element
  let width = d3svg.attr('width') || 400
  let height = d3svg.attr('height') || 300
  // let d3svg = d3con.select(container)
  //   .append('svg')
  console.log('d3svg width, height', width, height)
  options._width = width
  options._height = height
  /* eslint {indent: off} */
  switch (opts.type) {
    case 'bar':
      chart = barchart(d3svg, options)
      break
  }
  return chart
}
